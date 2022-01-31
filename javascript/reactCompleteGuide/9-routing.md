---
title: 'Routing'
part: 9
date: '2020-04-20'
categories: [frontend]
tags: [react, js]
source: [udemy]
---

# Routing

## Routing Props

When `react-router` renders a component, it passes routing-related props: `history`, `location`, and `match`.

```js
<Route path='/blog' component={Blog} />

// In Blog.js...
const Blog = props => {
  console.log(props) // Includes routing-related props

  return (
    <div>I'm a blog</div>
  )
}
```

**Pro tip**: Another way to gain access to routing-related props is to use the higher-order component `withRouter`.

```js
import { withRouter } from 'react-router-dom'

// ...

export default withRouter(Component)
```

## Link Component

The `Link` component basically renders an anchor component and prevents the default behaviour, re-rendering the DOM instead of navigating to the new link and losing state. Here's some useful tips...

You can pass an object instead of a string:

```js
<Link to={{
  pathname: '/login',
  hash: '#start',
  search: '?new-user=true'
}}>
  Log In
</Link>
```

By default, the path you provide is *absolute*, appending it to the root domain. To make it relative, just use routing-related props:

```js
// In Blog.js
<Link to={{
  pathname: this.props.match.url + '/login' // becomes '/blog/login'
}}>
  Log into Blog
</Link>
```

If you want to add styling to your *active* links, use `NavLink` instead:

```js
<NavLink
  to='/login'
  exact // important!
  activeClassName='activeLink' // defaults to 'active'
  activeStyle={{
    color: 'red'
  }}
>
  Log In
</NavLink>
```

### Navigating programmatically

Sometimes, instead of using `Link` to immediately navigate to a URL, we want to *first* run some code and *then* navigate to the URL.

In this case, we can programmatically navigate to a URL using the `history` prop provided:

```js
<Component
  onClick={() => {
    // Do stuff first and then...
    this.props.history.push({ pathname: '/new-url' })
  }} />
```

**Note**: Recall how browser history is like a linked list. By pushing to the end of the list, we're navigating to a new page by adding it to history.

## Route Parameters

Suppose we want to display a blog post with the url `https://blog.com/my-blog-post`, using `my-blog-post` as the slug used to query the blog post contents.

Here's how we can access the parameter:

```js
<Route path='/:slug' exact component={Post} />

// In Post.js...
async componentDidMount() {
  const postData = await getPost(this.props.match.params.slug)
  // ...
}
```

By marking our `:slug` value as a dynamic value, we have access to `slug` as a routing-related prop.

## Using Switch

When implementing multiple `Route` components, it's common to accidentally render more components than you want.

The `Switch` component helps with this. Like the `switch` statement, it renders the first `Route` that matches the path visited:

```js
<Switch>
  <Route path='/' exact component={Home} />
  <Route path='/blog' component={Blog} >
</Switch>
```

## Nested Routes

It's possible to have a `Route` component *inside* another `Route` component. However, it's important to understand that the parent `Route` needs to remain rendered when you navigate to the child `Route`.

The below example will not work because when you navigate to `/:slug`, `Blog` will unmount because the route doesn't match `/blog`. And because the child `Route` is part of `Blog`, it will also unmount.

```js
// Parent: App.js
<Route path='/blog' component={Blog} />

// Child: Blog.js
<Route path='/:slug' component={Post} />
```

To solve this, it's better to utilize a *relative path* (as mentioned earlier). The below example will work because `this.props.match.url` will include `/blog` in the URL.

```js
// Parent: App.js
<Route path='/blog' component={Blog} />

// Child: Blog.js
<Route path={this.props.match.url + '/:slug'} component={Post} />
```