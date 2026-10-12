# Deep Learning from Scratch — Pen-and-Paper Curriculum

**Goal.** At the end, sit with a blank notebook and derive everything from linear regression to policy gradients from nothing. For every symbol, be able to say what it means in plain English and what it is in an implementation.

**Source spine.** Seth Weidman, *Deep Learning from Scratch: Building with Python from First Principles* (O'Reilly, 2019). The learner's trajectory is the table of contents of its chapters 2–7. Changes to that trajectory are marked **[ADDED]**, **[FOLDED IN]**, **[OPTIONAL]** or **[REFRAMED]**, and all of them are listed in §7.

---

## 1. Rules of the game (methodology)

1. **No code.** Everything is written in the notebook. Implementation concepts appear only as *meanings*, never as code. Example: "this matrix is a block of numbers kept in memory and overwritten at every update."
2. **If we can't write it as maths, we don't understand it yet.**
3. **Every symbol gets a three-line symbol card:**
   - *Math:* what kind of object it is, and its shape.
   - *Plain English:* what it means in the car world.
   - *Implementation:* is it stored, learned, set by hand, or thrown away after each step?
4. **One world, one project.** The world is a toy self-driving car. Each part gives the car a new ability, and nothing is thrown away.
5. **Easy numbers.** Use integers, 0/1 and ½. If the arithmetic is the hard part, change the example, not the concept.
6. **Every new piece must be forced by a failure of the previous piece.** Always write down "what broke" before "what fixes it".
7. **Depth tiers, to avoid rabbit holes:**
   - **D (Derive):** must be reproduced from a blank page.
   - **U (Understand):** explain it in English, write the formula and know its shape. No full proof.
   - **N (Name):** know what it is and what problem it solves.
8. **No flattery.** Errors get pointed out precisely, along with what to do about them.

## 2. Lesson protocol (every session)

0. **Recall (≈5 min).** Reproduce last session's boxed result on a blank page, without notes. Log any mistakes in `PROGRESS.md`.
1. **The question.** What broke, or what do we want the car to do now?
2. **Symbol cards** for each new term.
3. **Derivation.** The learner writes it and the tutor scaffolds. The tutor never writes a derivation the learner can do.
4. **Hand computation** on the running example, with easy numbers.
5. **Checks:**
   - (a) a shape check;
   - (b) a numerical-gradient check by hand, `(f(θ+h) − f(θ−h)) / 2h`, or a limiting case;
   - (c) a plain-English sanity check of the sign and size of the answer.
6. **Box it.** This is the result to keep: the page you will reproduce later.
7. **One researcher question.** A "what if" to predict before we check it. Example: "What if every weight starts at 0?"

Each Part ends with a **blank-page exam** on that Part's D-tier list.

## 3. Notation (fixed for the whole course)

This uses the row convention: examples are rows. NumPy and PyTorch use the same layout, so the notebook translates straight to code later.

| Symbol | Shape | Meaning |
|---|---|---|
| n | scalar | number of examples in a batch |
| d | scalar | number of input features |
| x⁽ⁱ⁾ | 1×d | one example: one situation the car is in |
| X | n×d | a batch; row i is example i |
| y, ŷ | n×1 (n×k for k classes) | true target, prediction |
| W⁽ˡ⁾ | (inputs)×(outputs) | weights of layer l |
| b⁽ˡ⁾ | 1×(outputs) | bias of layer l, added to every row |
| Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾W⁽ˡ⁾ + b⁽ˡ⁾ | n×(outputs) | pre-activation |
| A⁽ˡ⁾ = σ(Z⁽ˡ⁾) | n×(outputs) | activation; A⁽⁰⁾ = X |
| L | scalar | loss |
| ∂L/∂W | same shape as W | gradient. **It always has the shape of the thing.** |
| η | scalar | learning rate |
| θ | — | all parameters together |

Indices: i = example, j = feature/unit, l = layer, t = time step (RNN/RL), c = channel (CNN).

## 4. The running world: a toy self-driving car

| Part | The car's new ability | Data it sees |
|---|---|---|
| 0–1 | Predict stopping distance | (speed, wet road?) → metres |
| 2–3 | Same task, but capture the curve and the speed × wetness interaction | same data |
| 4 | Recognise what's ahead: {clear, pedestrian, car} | a few sensor readings → class |
| 5 | Recognise it from raw camera pixels, including a red/green traffic light | tiny images (3×3, 4×4; 1–2 channels) |
| 6 | Use time: predict what happens next | sequences of sensor readings |
| 6.6 (optional) | Attend to the relevant past moments | same sequences |
| 7 | Compress what it sees, without labels | camera frames → 2-number code |
| 8 | Decide, and learn from consequences | road world: states, actions, rewards |

### Dataset v0: stopping distance (fixed; do not change)

**Training**

| # | speed v (×10 km/h) | wet w (0 = dry, 1 = wet) | stopping distance y (m) |
|---|---|---|---|
| 1 | 1 | 0 | 2 |
| 2 | 2 | 0 | 6 |
| 3 | 1 | 1 | 3 |
| 4 | 2 | 1 | 10 |

**Test** (never touched during training)

| # | speed v | wet w | stopping distance y |
|---|---|---|---|
| 5 | 3 | 0 | 12 |
| 6 | 3 | 1 | 21 |

The units are chosen to keep the arithmetic tiny. Whether a straight-line model can capture this data is the first open question we investigate. Later datasets are defined in their own Part and logged here when they are introduced.

---

## 5. The curriculum

Each lesson is mapped 1:1 to an item in the learner's trajectory, except where it is marked [ADDED].

### Part 0 — Foundations [ADDED: Weidman Ch. 1 + Appendix A, skipped in the trajectory]

*Why:* backprop is the chain rule applied to matrices. Without this Part, everything after it is memorised, not derived. The diagnostic decides its depth: 2–6 sessions.

- **0.1 Functions as machines.** Input → output; composition. Car: distance = f(speed). [D]
- **0.2 The derivative as sensitivity.** "Nudge the speed a little: how much does the distance move?" Slope. The numerical derivative (central difference), which is the checking tool you'll use for the whole course. [D]
- **0.3 Nested functions and the chain rule.** Draw the computational graph. The forward pass runs left → right; the backward pass runs right → left, multiplying local derivatives. [D]
- **0.4 Multiple inputs.** Partial derivatives and the gradient vector. Geometrically, the gradient is the direction of steepest increase. [D]
- **0.5 Vectors and matrices.**
  - The dot product is a weighted sum, which is the neuron's core.
  - Matrix multiplication is many dot products at once, which means a whole batch at once.
  - Shape rule: (n×d)(d×k) = (n×k). Transpose. [D]
- **0.6 Derivatives with matrices.**
  - Derive ∂L/∂W = Xᵀ·(∂L/∂P) for P = XW by writing out a 2×2 case element by element.
  - The bias gradient is a sum over the batch rows.
  - Check: the gradient has the shape of the thing.
  - Forward and backward passes on a computational graph with matrix inputs. [D]

**Blank-page exam P0:**
- the chain rule through 3 nested functions;
- the partials of (wx + b − y)²;
- the Xᵀ rule, from a 2×2 case;
- the bias-sum rule.

### Part 1 — Supervised learning and linear regression [Weidman Ch. 2, first half]

- **1.1 Supervised learning overview.** Object → feature vector → target. What "a situation the car is in" becomes as numbers, why it has to be numbers, and what gets lost. Labelled data (x, y). [U]
- **1.2 Supervised learning models.** A model is a family of functions f_θ. Parameters are learned; hyperparameters are chosen by you. Regression vs classification. [U]
- **1.3 Linear regression.** [D]
  - ŷ = x·w + b, then the batch form ŷ = XW + b.
  - Symbol cards:
    - w₁ = "extra metres of stopping distance per extra unit of speed, with wetness held fixed";
    - w₂ = the same idea for wetness;
    - b = "baseline distance".
  - Loss: mean squared error, and *why squared*. [ADDED: one page showing that MSE is maximum likelihood under Gaussian noise. U]
- **1.4 Training the model.** [D]
  - The forward pass as a graph: X, W → N = XW → P = N + b → L = mean((y − P)²).
  - The backward pass by the chain rule gives ∂L/∂W and ∂L/∂b.
  - Gradient descent: θ ← θ − η·∂L/∂θ.
  - Run 2 full iterations by hand.
- **1.5 Assessing our model: training set vs testing set.**
  - Why the test set is sacred. MAE and RMSE. Overfitting vs underfitting.
  - Reading the residuals: a systematic pattern means the model is too simple.
  - Evaluate on rows 5–6.
  - The experiment: a hand-made feature (speed²) vs "let the model make its own features". This motivates Part 2.
  - [D for the metrics, U for bias/variance]

**Blank-page exam P1:** the full linear-regression forward pass, backward pass and update in matrix form, with shapes.

### Part 2 — Neural networks from scratch [Weidman Ch. 2, second half]

- **2.1 Neural networks from scratch.** [D]
  - Prove that two linear layers collapse into one, so a nonlinearity is required.
  - Hidden layer: H = σ(XW⁽¹⁾ + b⁽¹⁾), then ŷ = HW⁽²⁾ + b⁽²⁾.
  - The sigmoid and its derivative σ(1 − σ).
  - Symbol card: a hidden unit is a *learned feature*, e.g. "is this a fast-and-wet situation?"
- **2.2 Training and assessing our first neural network.** A full backward pass through 2 layers by hand (2 hidden units, 2 examples). Compare against linear regression on the test rows. [D]

**Blank-page exam P2:** forward and backward passes for a 1-hidden-layer network, with all gradients and all shapes.

### Part 3 — Deep learning from scratch: the building blocks [Weidman Ch. 3]

*Weidman's classes become mathematical objects:* an Operation is a function together with its backward rule. No code is needed.

- **3.1 Deep learning definition, a first pass.** A composition of differentiable, parameterised functions, trained by gradient descent on a loss. [U]
- **3.2 The building blocks of neural networks: Operations.** An operation is a pair:
  - forward: Y = f(X);
  - backward: given ∂L/∂Y, return ∂L/∂X and ∂L/∂params.
  - Derive the backward rule for WeightMultiply, BiasAdd, Sigmoid and Linear (identity). [D]
- **3.3 The building blocks of neural networks: Layers.** A Dense layer is WeightMultiply → BiasAdd → activation. What counts as a layer's parameters. [D]
- **3.4 Building blocks on building blocks: the NeuralNetwork, and the Loss as the last block.** [D]
  - Forward = composition, left → right.
  - Backward = one reverse sweep.
  - The general recursion: δ⁽ˡ⁾ = (δ⁽ˡ⁺¹⁾·W⁽ˡ⁺¹⁾ᵀ) ⊙ σ′(Z⁽ˡ⁾).
- **3.5 Deep learning from scratch.** Going deep means stacking more layers. Does depth change the maths? No: it's the same recursion. What *does* change is that gradients are now products of many factors, which is a preview of Parts 4.6 and 6.5. [D]
- **3.6 Trainer and Optimizer.** [D]
  - Epoch, batch, and shuffling (and why it matters).
  - The training loop as an ordered list of mathematical steps.
  - The optimizer as a separate rule: SGD now; momentum and Adam plug in here later.
- **3.7 Putting everything together.** A 2-hidden-layer network on the car data. One full iteration by hand, with tiny sizes, then evaluate. [D]

**Blank-page exam P3:** the generic backprop recursion, plus each operation's backward rule.

### Part 4 — Extensions [Weidman Ch. 4]

- **4.1 Some intuition about neural networks.** Layers bend and fold the input space. Universal approximation is stated, not proved. [U]
- **4.2 The softmax cross-entropy loss function.** New car task: classify the scene ahead as {clear, pedestrian, car}. [D]
  - Softmax: why exponentiate, and why normalise.
  - Cross-entropy = −log(the probability given to the truth), which is maximum likelihood [ADDED tie-in].
  - Derive the gradient p − y.
  - Why MSE + sigmoid is a bad pairing for classification (saturation).
- **4.3 Experiments, on paper.** [U]
  - Design: the hypothesis, what you change, what you hold fixed, which metric, and what result would prove you wrong.
  - Hand-simulate small cases (e.g. sigmoid vs tanh gradient sizes), predicting before checking.
- **4.4 Momentum.** Hand-simulate 3 steps on a narrow 2-D valley, with and without momentum. The velocity update. Physical meaning: a rolling ball. [D]
- **4.5 Learning rate decay.** Linear and exponential schedules. Why large-then-small. [D]
- **4.5b Adam [ADDED].** Momentum plus a per-parameter step size, plus bias correction [U]. Adam(W) is today's default optimizer. [D for the update rule]
- **4.6 Weight initialisation.** Why all-zeros fails (symmetry). Derive Var(z) = n_in·Var(w)·Var(x), which leads to Glorot/He scaling. [D]
- **4.7 Dropout.** [D]
  - A random mask, and inverted-dropout scaling 1/(1 − p) so the expected activation is unchanged (derive this).
  - Behaviour at training time vs test time.
  - Plain English: the network can't rely on any single feature.
  - [ADDED: one page on L2 weight decay, the other common regulariser.]

**Blank-page exam P4:**
- the softmax-CE gradient;
- the momentum update;
- the Adam update;
- the initialisation-variance argument;
- the dropout expectation.

### Part 5 — Convolutional neural networks [Weidman Ch. 5 + Appendix A]

- **5.1 Neural networks and representation learning.** Hand-made features (Part 1) vs learned features. Why a dense layer on raw pixels wastes parameters and ignores that nearby pixels belong together. Count the parameters for a 4×4 image. [U]
- **5.2 Convolutional layers.** [D]
  - 1-D convolution by hand, then 2-D.
  - A filter as a pattern detector (e.g. the edge of an obstacle).
  - Weight sharing; padding; stride; the output-size formula.
- **5.3 Implementing the multichannel convolution operation.** Traffic-light example with red and green channels. [D for 1-D, U for the multichannel backward pass]
  - The index formula for the forward pass.
  - The backward pass, derived fully for 1-D single-channel, then generalised by shape.
  - Convolution as matrix multiplication (Weidman App. A).
- **5.4 Using this operation to train a CNN.** conv → (pooling [N/U]) → flatten → dense → softmax-CE. One forward pass by hand at tiny sizes, plus a shape trace of the whole network. [D for shapes]

**Blank-page exam P5:**
- the conv forward pass (multichannel index formula);
- the 1-D conv backward pass;
- the output-size formula;
- a CNN shape trace.

### Part 6 — Recurrent neural networks [Weidman Ch. 6]

- **6.1 The key limitation: handling branching.** When one value feeds two places, its gradient is the **sum** of the two path gradients (the multivariable chain rule). Prove it on a tiny example, and see why the Part-3 Operation framework breaks. [D]
- **6.2 Automatic differentiation.** [D]
  - Every value remembers how it was made, and gradients accumulate (+=).
  - A reverse sweep on a small graph, by hand.
  - Why reverse mode suits "one loss, millions of parameters".
  - This is what PyTorch's autograd is.
- **6.3 Motivation for RNNs.** The car's readings arrive over time (distance to the car ahead: 5, 4, 3, …). Sequences have variable length, and the same weights are shared across time steps. [U]
- **6.4 Introduction to RNNs.** [D]
  - hₜ = tanh(xₜWₓ + hₜ₋₁Wₕ + b) and ŷₜ = hₜWᵧ + bᵧ.
  - Unroll the graph: Wₕ is used at every step, so there is branching everywhere. That is why 6.1 came first.
- **6.5 RNNs in depth.** [D for the BPTT scalar case and the LSTM forward equations, U for the LSTM backward pass]
  - Backprop through time by hand (scalars, 3 steps).
  - Vanishing/exploding gradients from repeated multiplication; gradient clipping.
  - The LSTM and GRU equations, and the additive-cell-state argument for why they fix vanishing gradients.
- **6.6 [OPTIONAL: decision D2] Attention.** 2–3 sessions.
  - The RNN bottleneck motivates scaled dot-product attention, softmax(QKᵀ/√d)V. Work it by hand with 3 tokens of 2-D vectors.
  - Self-attention.
  - The transformer block: attention + MLP + residual + layer norm [U].

**Blank-page exam P6:**
- the branching-sum rule;
- autodiff on a small graph;
- the RNN forward pass and BPTT (scalar case);
- the LSTM equations.

### Part 7 — PyTorch [Weidman Ch. 7] [REFRAMED for pen and paper]

No code. This Part becomes shape algebra plus a translation table from notebook objects to implementation objects.

- **7.1 PyTorch tensors.** [D]
  - A tensor is an n-dimensional array of numbers with a shape.
  - Axes; the batch axis.
  - Broadcasting rules: this is exactly why "+ b" works on every row.
  - Reshape and flatten. Shape exercises on paper.
- **7.2 Deep learning with PyTorch.** A "Rosetta page" mapping each notebook object to its implementation object: [U]
  - parameter;
  - layer/module;
  - loss;
  - autograd graph (= 6.2);
  - backward (= the reverse sweep);
  - optimizer step (= 3.6);
  - zeroing gradients (= why the += from 6.2 must be reset).
- **7.3 CNNs in PyTorch.** The (N, C, H, W) layout. A full shape trace of a CNN on car-camera frames. [D for shapes]
- **7.4 Postscript: unsupervised learning via autoencoders.** [D]
  - No labels.
  - Encoder X → z (2 numbers); decoder z → X̂.
  - Reconstruction loss.
  - What the 2 numbers come to mean, linked back to representation learning (5.1).

**Blank-page exam P7:**
- the broadcasting rules;
- the autoencoder's forward pass, loss and gradient structure;
- a CNN shape trace.

### Part 8 — Towards RL [the learner's addition; scoped as a bridge, not a full RL course]

- **8.1 From predicting to deciding.** Agent, environment, state, action, reward, and policy π(a|s). The car on a 4-cell road with an obstacle. The MDP definition. [D]
- **8.2 Return and values.** [D]
  - Return Gₜ = Σₖ γᵏ·rₜ₊ₖ; value V(s); action-value Q(s, a).
  - The Bellman equations.
  - Value iteration by hand on the 4-cell road.
- **8.3 Q-learning.** [D]
  - Q-learning by hand, with a table.
  - Then replace the table with our network. The TD target r + γ·maxₐ′ Q(s′, a′) turns RL into the familiar regression with MSE.
  - Target networks and replay buffers. [N]
- **8.4 Policy gradient.** [D]
  - The Part-4 softmax classifier *becomes the policy*.
  - The log-derivative trick: ∇E[R] = E[R·∇log π].
  - REINFORCE. The gradient is the cross-entropy gradient (p − onehot(a)) weighted by the return.
  - A baseline to reduce variance [U].
  - A one-page bridge to RLHF: the policy is a language model, and the reward comes from a learned reward model. [N]
- **8.5 Capstone.** One blank notebook, everything from Part 0 to 8.4.

---

## 6. Session estimate

| Part | Sessions |
|---|---|
| P0 | 2–6 |
| P1 | 5 |
| P2 | 3 |
| P3 | 7 |
| P4 | 8 |
| P5 | 5 |
| P6 | 7 (+3 if attention is included) |
| P7 | 4 |
| P8 | 5 |

That is roughly 45–55 sessions. The blank-page exams set the pace, not the calendar.

## 7. Changes from the original trajectory (research notes)

The trajectory matches the table of contents of Weidman's chapters 2–7. These are the gaps found:

1. **[ADDED, essential] Chapter 1, "Foundations".** Derivatives, the chain rule, matrix derivatives and computational graphs are missing from the trajectory. They are the maths everything else stands on. → Part 0.
2. **[FOLDED IN] Weidman's Appendix A deep dives.** The matrix chain rule, the bias gradient, and convolution as matrix multiplication are the most pen-and-paper-friendly material in the book. → 0.6, 5.3.
3. **[ADDED, small] Why MSE and cross-entropy are what they are** (maximum likelihood), one page each. → 1.3, 4.2. Part 8 needs this too.
4. **[ADDED, small] Adam.** The book stops at momentum, but Adam(W) is the default today. → 4.5b.
5. **[ADDED, small] L2 weight decay** beside dropout. → 4.7.
6. **[OPTIONAL: D2] Attention/transformers.** The book (2019) ends at RNNs/LSTMs, but frontier language models are transformers. → 6.6.
7. **[SCOPED] "Towards RL"** is defined concretely as 8.1–8.4, so it has an end point.
8. **[REFRAMED] Part 7 (PyTorch) and 4.3 (Experiments)** are code-centric in the book. See §8.
9. **Small trajectory omission:** Weidman's "Building blocks on building blocks" section sits between "Layers" and "The NeuralNetwork class". It is merged into 3.4.

## 8. Known limits of pen-and-paper

- Some intuition only comes from watching loss curves over thousands of steps: how momentum behaves over 1000 steps, or how much dropout helps on real data. On paper we get the *mechanism* (hand-simulating 2–3 steps) and a *prediction*. The large-scale behaviour will be reported from known results, and it will be labelled as such. Running these experiments later would close the gap; that is the learner's call once the curriculum is done.
- Research-level proofs (convergence, universal approximation) are deliberately tier U/N.
