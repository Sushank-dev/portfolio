# Antigravity Portfolio Master Plan

## **1. Aesthetic Direction: "Realistic Antigravity"**
*   **Vibe:** Clean, physics-based, high-fidelity. Less "Matrix/Cyberpunk", more "Apple/Google Design".
*   **Reference:** `antigravity.google` (Fluid motion, particles, smooth waves).
*   **Core Change:** Remove all "Glitch" effects. Replace with "Fluid/Physics" motion.

---

## **2. The New Background: "The Gravity Wave"**
*   **Technology:** React Three Fiber (R3F) + InstancedMesh.
*   **Visual:**
    *   A massive, sparse grid of **thousands of tiny spheres** (dots) floating in a void.
    *   **Animation:** They gently undulate in a sine-wave pattern (like a breathing ocean).
    *   **Interaction:** When the mouse moves, the particles near the cursor are "repelled" or "attracted" smoothly, creating a liquid ripple effect.
    *   **Material:** Simple white/grey emissive material. Minimalist and high-res.
    *   **Implementation:** Use a custom Shader on an `InstancedMesh` for performance (10,000+ particles).

---

## **3. Text & UI Updates**
*   **Remove:** `GlitchText.tsx`, `TextScramble.tsx` (the "hacker" effects).
*   **New Style:** **"Cinematic Mask Reveal"**.
    *   Text slides up from an invisible clipping mask (`overflow: hidden`).
    *   Easing: `power3.out` (Slow, smooth settling).
*   **Preloader:**
    *   **Logic:** Increase minimum duration to **3.0 seconds**.
    *   **Visual:** A simple progress bar or a single "breathing" circle that expands into the main site.

---

## **4. Section Overhauls**

### **A. Hero Section**
*   **Content:** "Thatipelly Sushank".
*   **Effect:** The "Gravity Wave" background is most active here. The text floats *in front* of the 3D wave.
*   **Interaction:** Moving the mouse creates ripples that travel behind the text.

### **B. Skills Section: "The Falling Physics"**
*   **Concept:** "Simple Physics".
*   **Visual:**
    *   No grid. No list.
    *   A clean "glass box" container in the center of the screen.
    *   **Action:** When the user scrolls here, 20-30 realistic **Marbles/Spheres** drop from the top.
    *   **Texture:** Each marble has a logo (React, JS, etc.) mapped onto it like a sticker on a glass ball.
    *   **Physics:** Real gravity (`@react-three/cannon`). They bounce and settle. The user can knock them around.

### **C. Projects Section: "The Floating Cards"**
*   **Concept:** "Weightless Gallery".
*   **Visual:**
    *   Project cards hover in 3D space.
    *   **Scroll:** As you scroll, they gently float up (`y` axis) with different speeds (Parallax), creating a sense of depth.
    *   **Hover:** No glitch. The card simply lifts up (`z` axis) and casts a soft shadow, tilting smoothly to look at the mouse.

---

## **5. Implementation Steps for Copilot**

### **Step 1: Clean Up**
*   **Delete:** `src/components/GlitchText.tsx`, `src/components/ParticleBackground.tsx`.
*   **Modify:** `src/App.tsx` to remove `GlitchText` imports.

### **Step 2: The "Gravity Wave" Background**
*   **Instruction:** "Create `src/components/canvas/GravityWave.tsx`. Use R3F `InstancedMesh`. Create a grid of 50x50 particles. In the `useFrame` loop, animate their `y` position using `Math.sin(t + x + y)` to create a wave. Add a 'mouse repulsion' uniform to the shader/animation so the wave reacts to the cursor."

### **Step 3: The Physics Skills**
*   **Instruction:** "Install `@react-three/cannon`. Create `PhysicsSkills.tsx`. Use `<Physics>` provider. Create a `Marble` component (Sphere with texture). Drop 20 marbles into a box with invisible walls (`usePlane`)."

### **Step 4: Update Preloader**
*   **Instruction:** "In `App.tsx`, change the `setTimeout` for the preloader to `3000` (3 seconds). Ensure the transition out is slow and smooth."

### **Step 5: Replace Glitch Text**
*   **Instruction:** "Replace all instances of `<GlitchText>` with a standard `<motion.span>` that animates `opacity: 0 -> 1` and `y: 20 -> 0`."
    