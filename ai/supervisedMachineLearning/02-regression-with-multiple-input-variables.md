---
title: 'Regression with Multiple Input Variables'
part: 2
date: '2024-01-12'
categories: [ai]
tags: []
source: [coursera]
---

- How to use multiple input variables
- How to fit nonlinear curves to the data

## Multiple Linear Regression

To make linear regression more powerful, we want to be able to use multiple features. This is called **multiple linear regression**.

Returning to our housing example, we want to build a multiple linear regression model considers more features besides house size:

![](assets/week-02/multiple-features-table.png)

### Notation for multiple linear regression

To better talk about multiple features, we will introduce some new notation:

- $n$
  - Number of features
- $x_j$
  - $j^{\text{th}}$ feature, where $j \in [1..n]$
- $\vec{x}^{(i)}$
  - Vector of all the features of the $i^{\text{th}}$ training example
- $x_j^{(i)}$
  - $j^{\text{th}}$ feature for the $i^{\text{th}}$ training example

### Formula for multiple linear regression

In our new multiple linear regression model, we define it as the following linear function:

$$
f_{w, b}(x) = w_1x_1 + \dots + w_nx_n + b
$$

Or more succinctly, taking the vectors $\vec{w} = [w_1, \dots, w_n]$ and $\vec{x} = [x_1, \dots, x_n]$, we can use the **dot product** $\vec{w} \cdot \vec{x}$ to represent the same sum of products. This gives us the simpler notation

$$
f_{\vec{w}, b}(\vec{x}) = \vec{w} \cdot \vec{x} + b
$$

To take the concrete housing example above, maybe we define our model as

$$
f_{w, b}(x) = 0.1x_1 + 4x_2 + 10x_3 + -2x_4 + 80
$$

When we read this model, it's basically saying

- Each square foot adds $0.1 \cdot 1000 = 100$ dollars
- Each bedroom adds $4 \cdot 1000 = 4000$ dollars
- Each floor adds $10 \cdot 1000 = 10000$ dollars
- Each year of age subtracts $2 \cdot 1000 = 2000$ dollars
- Base price of any house starts at $80000$ dollars

### Vectorization

**Vectorization** is a way to compute the dot product of vectors efficiently and with far less code. This makes it the preferred approach, especially when the number of features, $n$, is large.

To understand the value of vectorization, let's try to compute a model's prediction without it. In code, we would use a for loop:

```py
w = np.array(n_parameters) # vector
b = 4 # number
x = np.array(n_features) # vector

f = 0
for j in range(0, n):
    f = f + w[j] * x[j]
f = f + b
```

**Problem**: This solution is sequential, where computation of `w[j] * x[j]` only happens after computation of `w[j-1] * x[j-1]`.

To speed this process up, vectorization uses _parallel hardware_—whether through the CPU or through the GPU—to compute the dot product. The result is the following code:

```py
f = np.dot(w, x) + b
```

> This is one of the reasons why GPU hardware is so popular for machine learning.

**Importance**: Vectorization and the parallel processing underlying it has become essential for machine learning algorithms, as many of them run on very large data sets.

### Vectorization under the hood

Consider the following example where we compute a model's prediction that has 16 features:

![](assets/week-02/with-and-without-vectorization-for-prediction.png)

On the left, we must run the computation in sequence.

On the right, we have 2 steps of parallel processing:

- Calculating products
- Adding together all of the products

Similarly, consider the following example where we compute one step in gradient descent for the same model with 16 features:

![](assets/week-02/with-and-without-vectorization-for-gradient-descent.png)

On the left, we must update each parameter $w_j$ in sequence.

On the right, we update each parameter $w_j$ in parallel as a single step.

### Vectorization applied to gradient descent for multiple linear regression

We are going to use vectors now, so we will make some updates to the linear regression model, its cost function, and gradient descent:

For the model (known already):

$$
f_{\vec{w}, b}(\vec{x}) = \vec{w} \cdot \vec{x} + b
$$

For the cost function:

$$
J(\vec{w}, b)
$$

For gradient descent:

$$
\begin{align*}
\text{Repeat}&\text{ until convergence:} \ \lbrace \\

w_j &= w_j - \alpha \frac{\partial}{\partial w_j} J(\vec{w}, b) \\
b &= b - \alpha \frac{\partial}{\partial b} J(\vec{w}, b) \\
\rbrace
\end{align*}
$$

More specifically, here are the formulas for the derivative terms now that there's multiple features:

$$
\begin{align*}
\frac{\partial}{\partial w_j} J(\vec{w}, b) &= \frac{1}{m} \sum_{i=1}^{m} ( f_{\vec{w}, b}(\vec{x}^{(i)}) - y^{(i)}) x_j^{(i)} \\

\frac{\partial}{\partial b} J(\vec{w}, b) &= \frac{1}{m} \sum_{i=1}^{m} ( f_{\vec{w}, b}(\vec{x}^{(i)}) - y^{(i)}) \\
\end{align*}
$$

Key differences are

- we now pass vectors $\vec{w}$ and $\vec{x}^{(i)}$ to function $f$, and
- we must specify feature $j$ at training example $i$ for value $x$.

### Normal equation

Alternative to gradient descent

_Only_ works for linear regression and nothing else

Doesn't involve an iterative process like gradient descent either. Solves for $w$ and $b$ in a single step.

Disadvantages:

- Only works for linear regression and nothing else
- Becomes slow if the numbers of features, $n$, is large

5:15

## Gradient Descent in Practice
