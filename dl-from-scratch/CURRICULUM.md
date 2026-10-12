# Deep Learning from Scratch — Pen-and-Paper Curriculum (v2)

**Goal.** By the end, sit with a blank notebook and derive everything from linear regression, through transformers at research depth, to RL and RLHF. For every symbol, be able to say what it means in plain English and what it is in an implementation.

**Source spine.** Seth Weidman, *Deep Learning from Scratch* (O'Reilly, 2019), chapters 2–7. The learner's trajectory is that book's table of contents. On top of it:
- Part 8 (Transformers) is added as **mandatory, research-depth**.
- Part 9 (RL) is scoped and extended to RLHF.
- All changes are listed in §8.

**v2 changes (2026-10-12, learner's decisions):**
- Maths is learned *just in time*: no upfront maths part.
- Transformers are mandatory and studied in depth.

---

## 1. Rules of the game

1. **No code.** Everything is written in the notebook. Implementation concepts appear only as *meanings*. Example: "this matrix is a table of numbers kept in memory and overwritten every update."
2. **Maths just in time.** We study the concept. The moment it needs maths, we stop, learn exactly that maths (a **Math Box**, §3), use it straight away on our numbers, and move on. No maths theory in advance. Each Math Box is extended later only when a later lesson needs more of it.
3. **If we can't write it as maths, we don't understand it yet.**
4. **Every symbol gets a three-line symbol card:**
   - *Math:* what kind of object it is, and its shape.
   - *Plain English:* what it means in the car world.
   - *Implementation:* is it stored, learned, set by hand, or thrown away after each step?
5. **One world, one project.** The world is a toy self-driving car. Each part gives the car a new ability, and nothing is thrown away.
6. **Easy numbers.** Use integers, 0/1 and ½. If the arithmetic is the hard part, change the example, not the concept.
7. **Every new piece is forced by a failure of the previous one.** Write down "what broke" before "what fixes it". Questions we can't answer yet go into the **Open Questions log** in `PROGRESS.md` and get closed later, the way research works.
8. **Depth tiers, to avoid rabbit holes:**
   - **D (Derive):** must be reproduced from a blank page.
   - **U (Understand):** explain it in English, write the formula and know its shape. No full proof.
   - **N (Name):** know what it is and what problem it solves.
9. **No flattery.** Errors get pointed out precisely, along with what to do about them.

## 2. Lesson protocol (every session)

0. **Recall (≈5 min).** Reproduce last session's boxed result on a blank page, without notes. Log any mistakes in `PROGRESS.md`.
1. **The question.** What broke, or what do we want the car to do now?
2. **Symbol cards** for each new term.
3. **Derivation.** The learner writes it and the tutor scaffolds. When maths is needed, run a Math Box (§3) inline.
4. **Hand computation** on the running example, with easy numbers.
5. **Checks:**
   - (a) a shape check;
   - (b) a numerical-gradient check by hand, `(f(θ+h) − f(θ−h)) / 2h`, or a limiting case;
   - (c) a plain-English sanity check of the sign and size of the answer.
6. **Box it.** This is the result to keep: the page you will reproduce later.
7. **One researcher question.** A "what if" to predict before we check it.
8. **Optional reading** (transformers and RL only). A named *section* of the original paper, read after the lesson, never before.

Each Part ends with a **blank-page exam** on that Part's D-tier list.

## 3. Math Box protocol and Math Toolbox index

**When a lesson hits maths:**
1. Name the need in the car's terms, e.g. "we need to know how the loss changes when w₁ changes".
2. One tiny check problem. If you already have it, skip the teaching.
3. Teach the *minimum*, anchored in the current example.
4. One or two tiny drills.
5. Apply it immediately in the lesson ("implement it" = use it on our numbers).
6. Log it in the toolbox below.

| Box | Maths | First needed in | Reused in |
|---|---|---|---|
| MB1 | Vectors; Σ notation; dot product = weighted sum | 1.3 | everywhere |
| MB2 | Matrices; matrix product = a batch of dot products; shapes; transpose; "+ b" added to every row | 1.3 | everywhere |
| MB3 | Derivative as sensitivity; numerical derivative (our checking tool) | 1.4a | every gradient check |
| MB4 | Partial derivatives; gradient vector; steepest descent | 1.4a | all training |
| MB5 | Chain rule; computational graphs (forward/backward) | 1.4a | all backprop |
| MB6 | Derivatives with matrices: the Xᵀ rule; bias gradient = sum over the batch | 1.4b | 2.2, 3.2, 8.6 |
| MB7 | exp and e; sigmoid and its derivative; a composition of linear maps is linear | 2.1 | 4.2, 9.5 |
| MB8 | Elementwise product ⊙; diagonal Jacobians of elementwise functions | 3.4 | 6.5, 8.6 |
| MB9 | Logs; probability distributions; one-hot; maximum likelihood (→ cross-entropy, and the reason behind MSE) | 4.2 | 8.5, 9.4 |
| MB10 | Random variables; E[·], Var[·]; independence; variance of a sum | 4.6 | 4.7, 8.4, 9.x |
| MB11 | Exponential moving averages; geometric series | 4.4 | 4.5b, 9.2 |
| MB12 | Index notation for multi-axis sums; convolution vs cross-correlation | 5.2 | 5.3, 7.3 |
| MB13 | Multivariable chain rule: sum over paths | 6.1 | 6.2, 6.4, 8.6 |
| MB14 | Long products: vanishing/exploding; eigenvalues/norms for matrices (U) | 6.5 | 8.10, 8.12 |
| MB15 | Tensors: axes, reshape, general broadcasting | 7.1 | 7.3, 8.7 |
| MB16 | One-hot × matrix = row lookup | 8.2 | 8.16 |
| MB17 | Dot product as similarity (angle, cosine) | 8.3 | 8.4, 8.8 |
| MB18 | Jacobian of a vector function; softmax Jacobian diag(p) − ppᵀ | 8.6 | 8.15 |
| MB19 | Permutation matrices; 2-D rotation matrices; sin/cos angle addition | 8.8 | — |
| MB20 | Per-row normalisation statistics: mean, variance, RMS | 8.10 | 8.17 |
| MB21 | Entropy (U); softmax with temperature, and its limits | 8.5 | 8.14, 9.5 |
| MB22 | Counting FLOPs and memory; power laws on log-log axes | 8.15 | — |
| MB23 | Bellman equations as fixed points (uses MB11) | 9.2 | 9.3 |
| MB24 | Log-derivative trick; gradients of expectations | 9.4 | 9.5 |
| MB25 | KL divergence; the Bradley–Terry preference model | 9.5 | — |

## 4. Notation (fixed for the whole course; introduced gradually)

This uses the row convention: examples are rows. NumPy and PyTorch use the same layout.

| Symbol | Shape | Meaning |
|---|---|---|
| n | scalar | number of examples in a batch |
| d | scalar | number of input features (later: model width) |
| x⁽ⁱ⁾ | 1×d | one example |
| X | n×d | a batch; row i is example i |
| y, ŷ | n×1 (n×k for k classes) | true target, prediction |
| W⁽ˡ⁾ | (inputs)×(outputs) | weights of layer l |
| b⁽ˡ⁾ | 1×(outputs) | bias, added to every row |
| Z⁽ˡ⁾ = A⁽ˡ⁻¹⁾W⁽ˡ⁾ + b⁽ˡ⁾ | n×(outputs) | pre-activation |
| A⁽ˡ⁾ = σ(Z⁽ˡ⁾) | n×(outputs) | activation; A⁽⁰⁾ = X |
| L | scalar | loss |
| ∂L/∂W | same shape as W | gradient. **It always has the shape of the thing.** |
| η | scalar | learning rate |
| θ | — | all parameters |

**Transformer additions:**

| Symbol | Meaning |
|---|---|
| T | sequence length |
| \|V\| | vocabulary size |
| E (\|V\|×d) | embedding matrix |
| W_U (d×\|V\|) | unembedding matrix |
| W_Q, W_K, W_V (d×d_k) | query, key and value projections |
| W_O (d×d) | output projection |
| h | number of heads |
| d_k = d/h | per-head width |

**Indices:** i = example, j = feature/unit, l = layer, t = time step/position, c = channel.

## 5. The running world: a toy self-driving car

| Part | The car's new ability | Data |
|---|---|---|
| 1 | Predict stopping distance | Dataset v0 |
| 2–3 | Same task, but capture the curve and the speed × wetness interaction | Dataset v0 |
| 4 | Recognise what's ahead: {clear, pedestrian, car} | Dataset v1 (sensor readings → class), defined in 4.2 |
| 5 | Recognise it from raw camera pixels, including a red/green traffic light | tiny images (3×3, 4×4; 1–2 channels), defined in 5.2–5.3 |
| 6 | Use memory: predict its next action from its trip log | Dataset v2 (trip logs) |
| 7 | Compress what it sees, without labels | camera frames → 2-number code |
| 8 | Solve the trip-log task without recurrence: the transformer | Dataset v2, the *same task as Part 6*, compared head to head |
| 9 | Decide and learn from consequences; then the trip-log transformer itself becomes the policy (RLHF in miniature) | road world + Dataset v2 |

### Dataset v0: stopping distance (fixed)

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

### Dataset v2: trip logs (fixed; introduced in 6.3)

**Vocabulary:** {green, red, go, stop}, so |V| = 4.

**Rule of the world:**
- Lights appear at unpredictable moments.
- After a light, the car's action follows it (green → go, red → stop) and repeats until the next light.

**Example:** `green go go red stop stop stop green go`

**Why this task:** to predict the next action, the model must find *the most recent light*, which can be any distance back. That is exactly where RNNs struggle and attention shines.

**Built-in research point:** the light tokens are genuinely unpredictable, so the loss on them cannot reach zero. That is an irreducible floor (entropy, MB21).

---

## 6. The curriculum

Lessons map 1:1 to the learner's trajectory unless they are marked [ADDED]. "→ MBk" marks where a Math Box fires.

### Part 1 — Supervised learning and linear regression [Weidman Ch. 2, first half]

- **1.1 Supervised learning overview.** Object → feature vector → target. What "a situation the car is in" becomes as numbers, why, and what is lost. Labelled data (x, y). [U]
- **1.2 Supervised learning models.** A model is a family of functions f_θ. Parameters are learned; hyperparameters are chosen by you. Regression vs classification. [U]
- **1.3 Linear regression.** → MB1, MB2 [D]
  - ŷ = x·w + b, then the batch form ŷ = XW + b.
  - Symbol cards:
    - w₁ = "extra metres per extra unit of speed, wetness held fixed";
    - w₂ = the same idea for wetness;
    - b = "baseline distance".
  - Loss: mean squared error. "Why *squared*?" gets intuitive reasons now; the real reason is logged as **OQ1** and closed in 4.2.
- **1.4a Training on one example.** → MB3, MB4, MB5 [D]
  - The loss as a function of w and b: sensitivity, partial derivatives, and the chain rule on the graph x, w → wx → wx + b → (ŷ − y)².
  - Check with the numerical derivative.
- **1.4b Training on the whole batch.** → MB6 [D]
  - The graph X, W → N = XW → P = N + b → L.
  - Derive ∂L/∂W = Xᵀ(∂L/∂P) from a 2×2 case written out element by element. The bias gradient is a sum over rows.
- **1.4c Gradient descent.** θ ← θ − η·∂L/∂θ. Two full iterations by hand on Dataset v0. What η does if it's too big or too small. [D]
- **1.5 Assessing our model: training set vs testing set.** [D for the metrics, U for bias/variance]
  - Why the test set is sacred. MAE and RMSE. Under- vs overfitting.
  - Reading residuals: a pattern means the model is too simple.
  - Evaluate on rows 5–6.
  - The experiment: a hand-made feature (speed²) vs "let the model build its own features" → Part 2.

**Blank-page exam P1:** lin-reg forward, backward and update in matrix form with shapes, plus the Xᵀ rule from a 2×2 case.

### Part 2 — Neural networks from scratch [Weidman Ch. 2, second half]

- **2.1 Neural networks from scratch.** → MB7 [D]
  - Prove that two linear layers collapse into one, so a nonlinearity is required.
  - H = σ(XW⁽¹⁾ + b⁽¹⁾), ŷ = HW⁽²⁾ + b⁽²⁾.
  - Symbol card: a hidden unit is a *learned feature*, e.g. "fast-and-wet?"
- **2.2 Training and assessing our first neural network.** The full backward pass through 2 layers by hand (2 hidden units, 2 examples). Compare against linear regression on the test rows. [D]

**Blank-page exam P2:** forward and backward passes for a 1-hidden-layer network, with all shapes.

### Part 3 — Deep learning from scratch: the building blocks [Weidman Ch. 3]

*Weidman's classes become mathematical objects:* an Operation is a function plus its backward rule.

- **3.1 Deep learning definition, a first pass.** A composition of differentiable, parameterised functions, trained by gradient descent on a loss. [U]
- **3.2 Operations.** Forward Y = f(X); backward: given ∂L/∂Y, return ∂L/∂X and ∂L/∂params. Derive the rules for WeightMultiply, BiasAdd, Sigmoid and Linear. [D]
- **3.3 Layers.** Dense = WeightMultiply → BiasAdd → activation. A layer's parameters. [D]
- **3.4 Building blocks on building blocks: the NeuralNetwork, with the Loss as the last block.** → MB8 [D]
  - Forward = composition; backward = one reverse sweep.
  - δ⁽ˡ⁾ = (δ⁽ˡ⁺¹⁾·W⁽ˡ⁺¹⁾ᵀ) ⊙ σ′(Z⁽ˡ⁾).
- **3.5 Deep learning from scratch.** Depth means stacking more layers: the same recursion, but gradients become long products (a preview of 4.6 and 6.5). [D]
- **3.6 Trainer and Optimizer.** Epoch, batch, and shuffling (why). The training loop as ordered maths steps. The optimizer as a pluggable rule. [D]
- **3.7 Putting everything together.** A 2-hidden-layer net on Dataset v0, one full iteration by hand, then evaluate. [D]

**Blank-page exam P3:** the backprop recursion, plus every operation's backward rule.

### Part 4 — Extensions [Weidman Ch. 4]

- **4.1 Some intuition about neural networks.** Layers bend and fold the input space. Universal approximation is stated, not proved. [U]
- **4.2 The softmax cross-entropy loss function.** Dataset v1: classify the scene ahead. → MB9 [D]
  - Softmax: why exponentiate, why normalise.
  - Cross-entropy = −log(probability of the truth) = maximum likelihood.
  - Derive the gradient p − y.
  - **Close OQ1:** MSE is maximum likelihood under Gaussian noise.
  - Why MSE + sigmoid is a bad pairing for classification.
- **4.3 Experiments, on paper.** [U]
  - Design: the hypothesis, what you change, what you hold fixed, the metric, and what result would prove you wrong.
  - Hand-simulate small cases (sigmoid vs tanh gradients), predicting first.
- **4.4 Momentum.** → MB11 [D]
  - 3 steps by hand in a narrow 2-D valley, with and without momentum.
  - Velocity as an exponential moving average. The rolling-ball picture.
- **4.5 Learning rate decay.** Linear and exponential schedules. Why large-then-small. [D]
- **4.5b Adam [ADDED].** Momentum plus a per-parameter step size; bias correction [U]. AdamW is today's default (needed again in 8.12). [D for the update rule]
- **4.6 Weight initialisation.** → MB10 [D]
  - Why all-zeros fails (symmetry).
  - Derive Var(z) = n_in·Var(w)·Var(x), which leads to Glorot/He scaling.
- **4.7 Dropout.** [D]
  - A mask, with inverted scaling 1/(1 − p) that preserves the expectation (derive this).
  - Training vs test behaviour.
  - [ADDED: one page on L2 weight decay.]

**Blank-page exam P4:**
- the softmax-CE gradient;
- the momentum and Adam updates;
- the initialisation-variance argument;
- the dropout expectation.

### Part 5 — Convolutional neural networks [Weidman Ch. 5 + Appendix A]

- **5.1 Neural networks and representation learning.** Hand-made features vs learned ones. The parameter count of a dense layer on a 4×4 image; locality. [U]
- **5.2 Convolutional layers.** → MB12 [D]
  - 1-D convolution by hand, then 2-D.
  - A filter as a pattern detector. Weight sharing; padding; stride; the output-size formula.
- **5.3 Implementing the multichannel convolution operation.** Traffic light with red and green channels. [D for 1-D, U for the multichannel backward pass]
  - The forward index formula.
  - The backward pass derived for 1-D single-channel, then generalised by shape.
  - Convolution as matrix multiplication (Weidman App. A).
- **5.4 Using this operation to train a CNN.** conv → (pooling [N/U]) → flatten → dense → softmax-CE. A forward pass by hand at tiny sizes, plus a full shape trace. [D for shapes]

**Blank-page exam P5:** the multichannel conv forward pass, the 1-D conv backward pass, the output-size formula, a CNN shape trace.

### Part 6 — Recurrent neural networks [Weidman Ch. 6]

- **6.1 The key limitation: handling branching.** → MB13 [D]
  - A value used twice gets the *sum* of its path gradients.
  - Why the Part-3 framework breaks.
- **6.2 Automatic differentiation.** [D]
  - Values remember how they were made, and gradients accumulate (+=).
  - A reverse sweep by hand.
  - Why reverse mode suits "one loss, millions of parameters".
- **6.3 Motivation for RNNs.** Dataset v2 (trip logs) is introduced. Variable length; sharing weights across time. [U]
- **6.4 Introduction to RNNs.** [D]
  - Tokens as one-hot vectors.
  - hₜ = tanh(xₜWₓ + hₜ₋₁Wₕ + b), ŷₜ = softmax(hₜWᵧ + bᵧ).
  - Unrolled, Wₕ is used at every step: branching everywhere, which is why 6.1 came first.
- **6.5 RNNs in depth.** → MB14 [D for BPTT and the LSTM forward pass, U for the LSTM backward pass]
  - BPTT by hand (scalars, 3 steps).
  - Vanishing/exploding gradients; clipping.
  - LSTM and GRU equations; the additive cell state as a "gradient highway".
  - **Open OQ2:** "Can the car use a light seen k steps ago *without* the signal passing through k multiplications, and without processing the log one step at a time?" Left open on purpose; closed in Part 8.

**Blank-page exam P6:** the branching-sum rule, autodiff on a small graph, RNN forward + BPTT (scalar case), the LSTM equations.

### Part 7 — PyTorch [Weidman Ch. 7] [REFRAMED: no code]

- **7.1 PyTorch tensors.** → MB15 [D]
  - Tensors, axes, the batch axis, broadcasting, reshape/flatten.
  - Shape exercises on paper (needed heavily in Part 8).
- **7.2 Deep learning with PyTorch.** A "Rosetta page" mapping notebook objects to implementation objects: parameter, module, loss, autograd graph (= 6.2), backward, optimizer step (= 3.6), zeroing gradients (= resetting the += from 6.2). [U]
- **7.3 CNNs in PyTorch.** The (N, C, H, W) layout; a full shape trace on car-camera frames. [D for shapes]
- **7.4 Postscript: unsupervised learning via autoencoders.** [D]
  - Encoder X → z (2 numbers) → decoder X̂; reconstruction loss; no labels.
  - What the code comes to mean.
  - The words *encoder* and *decoder* return in 8.13.

**Blank-page exam P7:** the broadcasting rules, the autoencoder's forward pass/loss/gradient structure, a CNN shape trace.

### Part 8 — Transformers [ADDED: mandatory, research depth, ≈22–26 sessions]

**Why it sits here:**
- It keeps the learner's original order intact.
- By now we have tensor shapes (7.1), encoder/decoder (7.4), softmax-CE (4.2), init variance (4.6), AdamW (4.5b), and RNNs to compare against.
- Part 9 can then close on RLHF *on a transformer*.

**Arc:**

| Stage | Lessons |
|---|---|
| Why | 8.1 |
| The attention mechanism | 8.2–8.8 |
| The block | 8.9–8.10 |
| The full model and its training | 8.11–8.13 |
| Inference and scale | 8.14–8.15 |
| Research-level mechanics | 8.16 |
| Modern variants | 8.17 |

#### 8.1 The open problem (OQ2) [U]
- Three RNN failures on trip logs:
  - (a) the light's signal must survive k multiplications;
  - (b) a fixed-size state is a bottleneck;
  - (c) step t must wait for step t − 1 (no parallelism).
- Path length between distant tokens: O(k) for an RNN vs O(1) with attention.
- History: attention was added to RNNs in 2014; recurrence was dropped in 2017.
- *Read:* Bahdanau et al. 2014 §3; Vaswani et al. 2017 §4 ("Why Self-Attention").

#### 8.2 Tokens and embeddings → MB16 [D]
- One-hot × E = row lookup.
- Symbol card for E: each token's learned profile; only rows of tokens that occur get a gradient (derive this).
- Unembedding W_U → logits; weight tying [U].
- Real tokenisation (BPE) [N].

#### 8.3 Attention as a soft lookup → MB17 [D]
- A hard dictionary lookup → a soft lookup.
- Symbol cards:
  - **query** = "what this position is looking for";
  - **key** = "what each position advertises";
  - **value** = "what each position hands over".
- By hand: 3 trip-log tokens with 2-D vectors. The "next action?" position finds the latest light.

#### 8.4 Scaled dot-product attention [D]
- Q = XW_Q, K = XW_K, V = XW_V.
- A = softmax(QKᵀ/√d_k); output = AV. Shapes.
- **Why √d_k:** derive Var(q·k) = d_k (MB10). Big logits saturate the softmax, which gives tiny gradients.

#### 8.5 Causal masking and the language-modelling objective → MB21 [D]
- Mask with −∞ above the diagonal (why −∞ becomes weight 0).
- Loss = mean cross-entropy over positions (from 4.2). Teacher forcing.
- All T predictions are trained **in parallel**, which closes OQ2(c).
- The irreducible loss on light tokens = entropy.

#### 8.6 Backprop through attention → MB18 [D]
- Derive the softmax Jacobian diag(p) − ppᵀ, and its efficient form p ⊙ (g − g·p).
- Derive gradients with respect to V, A, the scores, Q, K, then W_Q, W_K, W_V (reusing MB6).
- Numerical check with 2 tokens and d_k = 1.

#### 8.7 Multi-head attention [D for shapes and count, U for interpretation]
- h heads with d_k = d/h; concatenate; W_O.
- Shapes (B, h, T, d_k). Parameter count 4d².
- Plain English: one head finds "the latest light", another "the previous token".
- Prove concat(heads)·W_O = Σᵢ headᵢ·W_O⁽ⁱ⁾: heads write *independently* (sets up 8.16).

#### 8.8 Position → MB19 [D for the proof and RoPE in 2-D, U for sinusoidal]
- Prove unmasked self-attention is permutation-equivariant. "red go stop" and "stop red go" look alike without position information.
- Fixes:
  - learned absolute positions [D];
  - sinusoidal encodings [U];
  - **RoPE:** rotate q and k by an angle ∝ position, then prove the score depends only on m − n (2-D case).
- *Read:* Su et al. 2021 (RoFormer) §3.

#### 8.9 The position-wise MLP [D]
- The Part-2 network applied to each token separately; expansion to 4d; GELU [U].
- Plain English: attention *moves* information between tokens; the MLP *processes* it within a token.

#### 8.10 Residual connections and LayerNorm → MB20 [D for the residual gradient and LN forward, U for the rest]
- y = x + f(x) ⇒ ∂y/∂x = I + f′: a gradient highway. It's the same idea as the LSTM cell (6.5).
- LayerNorm forward [D]; LayerNorm backward [U].
- Why LayerNorm and not BatchNorm for sequences [U].
- Pre-LN vs post-LN, and stability [U]. RMSNorm [U].
- *Read:* Xiong et al. 2020 (pre-LN), abstract and Fig. 1.

#### 8.11 The full decoder-only transformer [D]
- Embed + position → L × [x + MHA(LN x); x + MLP(LN x)] → LN → unembed → softmax.
- A full shape trace.
- Parameter count ≈ 12·L·d² + |V|·d (derive). FLOPs per token ≈ 2N forward, ≈ 6N for training [U].
- **One complete forward pass by hand:** 1 layer, 1 head, d = 2, T = 3, trip-log vocabulary.
- **Head to head with Part 6:** the RNN vs the transformer on the same log.

#### 8.12 Training a transformer [U, D where it reuses earlier results]
- Loss over all positions.
- AdamW (decoupled weight decay).
- Warmup + cosine decay (extends 4.5; why warmup).
- Clipping (6.5); depth-scaled initialisation (extends 4.6); where dropout goes (4.7).

#### 8.13 Encoder, decoder, encoder–decoder [U, D for cross-attention shapes]
- A bidirectional encoder with a masked-LM objective (BERT).
- **Cross-attention:** Q from the decoder, K and V from the encoder.
- The original 2017 translation architecture. Links to the 7.4 encoder/decoder.

#### 8.14 Generation and inference [D]
- Autoregressive sampling.
- Temperature: derive the limits τ → 0 (argmax) and τ → ∞ (uniform). Top-k, top-p [U].
- **KV cache:**
  - why the causal mask makes past K and V reusable (derive);
  - memory = 2·L·T·d per sequence, times bytes (derive);
  - why decoding is memory-bound [U].
- MQA/GQA shrink the cache (derive the factor).
- *Read:* Shazeer 2019 (MQA); Ainslie et al. 2023 (GQA), abstract.

#### 8.15 Cost and scale → MB22 [mixed]
- Attention costs O(T²d) and the MLP O(Td²): derive which dominates when.
- **Online softmax:** a one-pass softmax with a running max and sum (derive the rescaling). This is the core idea behind FlashAttention [U/D].
- Scaling laws: loss is a power law in N, D and C; compute-optimal training uses ≈ 20 tokens per parameter [U/N].
- Linear attention *is* an RNN: S_t = S_{t−1} + φ(k_t)v_tᵀ (derive). The RNN returns. SSMs/Mamba [N].
- *Read:* Kaplan et al. 2020 Fig. 1; Hoffmann et al. 2022 (Chinchilla) main result; Dao et al. 2022 §3.1; Katharopoulos et al. 2020 §3.

#### 8.16 Research-level mechanics: the circuits view
- The **residual stream** as a shared channel: each layer reads by projection and writes by addition.
- Each head factors into a **QK circuit** W_Q·W_Kᵀ (*where* to look) and an **OV circuit** W_V·W_O (*what* to move) [D].
- A zero-layer transformer = a bigram table W_E·W_U [D].
- **Induction heads:** a previous-token head plus an induction head completes "A B … A → B". Trace it by hand on a trip log [U, hand trace].
- In-context learning [U]. Superposition [N/U].
- *Read:* Elhage et al. 2021, "A Mathematical Framework for Transformer Circuits" (residual stream, QK/OV, zero- and one-layer sections); Olsson et al. 2022, "In-context Learning and Induction Heads" (intro); Elhage et al. 2022, "Toy Models of Superposition" (intro).

#### 8.17 Modern variants: what changed since 2017 [U/N]
Each variant gets the problem it solves and the one equation that changed:
- pre-LN + RMSNorm;
- RoPE;
- SwiGLU;
- GQA;
- Mixture of Experts (router = softmax over experts, top-k);
- long context;
- latent-attention KV compression.

*Read:* Shazeer 2020 (GLU variants), Table 1.

**Blank-page exam P8:**
- causal scaled dot-product attention with shapes;
- the √d_k derivation;
- the softmax Jacobian and the attention backward pass;
- multi-head shapes and parameter count;
- the permutation-equivariance proof and the RoPE relative-position property;
- the residual gradient and LayerNorm forward;
- the full decoder-only forward pass and parameter count;
- the KV-cache formula and temperature limits;
- the QK/OV decomposition.

### Part 9 — Towards RL [the learner's addition; a scoped bridge, extended to RLHF]

- **9.1 From predicting to deciding.** Agent, environment, state, action, reward, policy π(a|s). The car on a 4-cell road with an obstacle. The MDP definition. [D]
- **9.2 Return, value, Bellman.** → MB23 [D]
  - Gₜ = Σₖ γᵏ·rₜ₊ₖ, plus V and Q.
  - The Bellman equations; value iteration by hand.
- **9.3 Q-learning.** [D; DQN tricks N]
  - Tabular Q-learning by hand, then a Q-network.
  - The TD target r + γ·maxₐ′ Q turns RL into our MSE regression.
- **9.4 Policy gradient.** → MB24 [D; baseline U]
  - The Part-4 softmax classifier becomes the policy.
  - ∇E[R] = E[R·∇log π]; REINFORCE.
  - The gradient = cross-entropy gradient × return. Baseline.
- **9.5 RLHF in miniature [ADDED].** → MB25
  - The Part-8 trip-log transformer *is* a policy.
  - Reward model from pairwise preferences: Bradley–Terry P(A ≻ B) = σ(r_A − r_B) (the sigmoid from 2.1). Derive its loss [D].
  - Policy objective with a KL penalty to a reference model [D for the objective]. PPO clipping [U]. DPO [N/U].
  - *Read:* Christiano et al. 2017 (intro); Ouyang et al. 2022 Fig. 2; Bai et al. 2022 (Anthropic, helpful & harmless RLHF), intro; Rafailov et al. 2023 (DPO) §4, optional.
- **9.6 Capstone.** One blank notebook, everything from 1.1 to 9.5.

---

## 7. Session estimate

| Part | Sessions |
|---|---|
| P1 | 7 |
| P2 | 3 |
| P3 | 7 |
| P4 | 9 |
| P5 | 5 |
| P6 | 6 |
| P7 | 4 |
| **P8** | **22–26** |
| P9 | 7 |

That is roughly 70–75 sessions; Part 8 alone is about a third of the course. The blank-page exams set the pace, not the calendar.

## 8. Changes from the original trajectory

1. **[v2] No upfront maths.** The earlier Part 0 (Weidman Ch. 1, Foundations) is dissolved into Math Boxes MB1–MB6, which fire inside lessons 1.3–1.4. Lesson 1.4 is split into 1.4a/b/c because that is where most of the maths lands.
2. **[v2, ADDED, mandatory] Part 8, Transformers, at research depth.**
3. **[v2] Dataset v2 (trip logs)** replaces a numeric sequence in Part 6, so that Parts 6, 8 and 9.5 share one task.
4. **[FOLDED IN] Weidman Appendix A** (matrix chain rule, bias gradient, conv as matmul). → 1.4b, 5.3.
5. **[ADDED, small] Maximum-likelihood view of the losses** (OQ1, 4.2); **Adam** (4.5b); **L2** (4.7).
6. **[SCOPED/EXTENDED] RL** = 9.1–9.4, plus RLHF in miniature (9.5) now that transformers are in.
7. **[REFRAMED] 4.3 Experiments and Part 7 PyTorch** become paper versions (see §9).
8. **"Building blocks on building blocks"** (a Weidman section missing from the trajectory) is merged into 3.4.

## 9. Known limits of pen-and-paper

- Large-scale behaviour can't be hand-simulated: loss curves over 10⁴ steps, why warmup is *empirically* necessary, loss spikes, and the discovery of induction heads in trained models. We derive the mechanism and make the prediction; the empirical results are reported and labelled as reported.
- "Research level" here means the mechanisms and maths at the depth of the original papers, plus reading their key sections. Running experiments is the other half of research; that remains open for after the course.
- Proofs of convergence and universal approximation are deliberately tier U/N.
