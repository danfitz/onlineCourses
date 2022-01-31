---
title: 'Events'
part: 4
date: '2021-04-29'
categories: [backend]
tags: [c#]
source: [udemy]
---

# Events

## The Problem

**Events** are mechanism by which to **communicate between objects**. In particular, one object acts as a **publisher** that sends an event, while the other other acts as a **subscriber** receiving the event.

The major benefit of events is it makes applications more **loosely coupled**.

Imagine we have a video encoder where we want to send an email after the encoding is complete. In normal cases, you will use dependency injection to insert services into your `VideoEncoder` class:

```csharp
public class VideoEncoder
{
    public void Encode(Video video)
    {
        // Encoding logic...

        _mailService.Send(new Mail());
    }
}
```

This code is generally fine. However, the problem arises when we have to add another service:

```csharp
_messageService.Send(new Text());
```

**Problem**: Adding another service means that `VideoEncoder` and all classes that inherit from or use `VideoEncoder` must be recompiled! Additionally, if we mess up our new logic, it could break in every place where `VideoEncoder` is used.

## Setting Up a Publisher

To solve the above problem, we don't dependency inject anything into `VideoEncoder`. It has no awareness of `MailService` or `MessageService`.

Instead, `VideoEncoder`, as a publisher, just needs to do the following:

1. Define a delegate
2. Define an event based on that delegate
3. Raise the event

```csharp
public class VideoEncoder
{
    // 1. Define a delegate
    public delegate void VideoEncodedEventHandler(object source, EventArgs e);

    // 2. Define an event based on that delegate
    public event VideoEncodedEventHandler VideoEncoded;

    public void Encode(Video video)
    {
        // Encoding logic...

        // 3. Raise the event
        OnVideoEncoded();
    }

    // Note: this is an event-raising method
    // Checks to see if there are subscribers BEFORE invoking
    protected virtual void OnVideoEncoded()
    {
        if (VideoEncoded != null)
            VideoEncoded(this, EventArgs.Empty); // we don't pass any args
    }
}
```

**Things to note**:

- We use a delegate to set a contract between publisher and subscriber. You'll see later that the subscriber must adhere to the signature of the delegate.
- The convention for a delegate used for an event is to name it `<EventName>EventHandler`.
- The convention for an event-raising method is to name it `On<EventName>`.
- The best practice for event-raising methods is to apply the access modifiers `protected` and `virtual`.

## Setting Up a Subscriber

Now that we have a publisher set up, we need to make sure the `MailService` and `MessageService` classes subscribe to the event.

The process is exactly like storing methods in a delegate:

1. Define a method that matches the signature of the delegate
2. Add the method to the event

```csharp
// Same code applies to MessageService...
public class MailService
{
    // 1. Define a method that matches the signature of the delegate
    public void OnVideoEncoded(object source, EventArgs e)
    {
        // Send mail...
    }
}


var video = new Video();
var encoder = new VideoEncoder();

// 2. Add methods to the event
var mailService = new MailService();
var messageService = new MessageService();
encoder.VideoEncoded += mailService.VideoEncoded;
encoder.VideoEncoded += messageService.VideoEncoded;

encoder.Encode(video);
```

That's it! Now `MailService` and `MessageService` will work after the video finishes encoding.

## Passing custom args to `EventArgs`

Suppose that we want our subscribers to get access to the `video` that was just encoded. To do this, we need to expand on `EventArgs`, so we can pass `video` to the subscriber.

```csharp
public class VideoEventArgs : EventArgs
{
    public Video Video { get; set; }
}

public class VideoEncoder
{
    public delegate void VideoEncodedEventHandler(object source, VideoEventArgs e);

    public event VideoEncodedEventHandler VideoEncoded;

    public void Encode(Video video)
    {
        // Encoding logic...

        OnVideoEncoded(video);
    }

    protected virtual void OnVideoEncoded(Video video)
    {
        if (VideoEncoded != null)
            // Now the event can include `video`!
            VideoEncoded(this, new VideoEventArgs() { Video = video });
    }
}

// And the subscriber can now access `Video`!
public class MailService
{
    public void OnVideoEncoded(object source, VideoEventArgs e)
    {
        Console.WriteLine(e.Video.Title);
    }
}
```

## `EventHandler` Delegate

Instead of defining our own custom `VideoEncodedEventHandler` delegate, .NET framework now provides the built-in `EventHandler` delegate.

- `EventHandler` is a delegate with a return type of `void` and parameters `object source` and `EventArgs e`.
- `EventHandler<TEventArgs>` is the same delegate except you pass your own custom event args.

Here's how the code looks:

```csharp
public class VideoEncoder
{
    public event EventHandler<VideoEventArgs> VideoEncoded;

    // ...
}
```
