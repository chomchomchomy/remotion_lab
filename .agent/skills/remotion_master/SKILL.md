---
name: Remotion Million Dollar Producer
description: A top-tier skill for creating viral, high-production-value videos with Remotion. Focuses on cinematic quality, psychological hooks, and data-driven personalization to achieve million-level reach.
---

# Remotion Million Dollar Producer Skill

This skill is designed to push Remotion beyond simple slideshows into the realm of professional motion graphics and viral short-form content.

## 1. The "Million-View" Strategy (Retention Editing)
- **Extreme Pacing**: Never exceed 2-3 seconds without a visual change (cut, zoom, or motion). 
- **The "Hook" (0-3s)**: Use movement, a bold question, or a high-contrast visual. 
  - *Action*: Use a strong `spring()` scale animation for the initial headline.
- **Micro-Hooks**: Every scene transition must re-engage. Use zoom-in or dolly zoom effects to punctuate key words.
- **Ruthless Trimming**: Remove all dead space. Narration should be tight, and animations should finish *exactly* when the voice stops.

## 2. Viral Aesthetics & Motion Design
- **Alex Hormozi Style Captions**: Large, bold, centrally placed text that changes color for emphasis.
  - *Viral Tip*: Segment text into 1-3 words per "page" and animate the current word with a "pop-up" scale or glow.
- **MrBeast Level Visuals**:
  - Layer multiple effects (dust, light sweeps, glows).
  - Use `z-index` and `perspective` to create a 3D depth.
  - Add "Camera Shake" for high-impact words.
- **Glassmorphism & Depth**: Use `backdrop-filter: blur(20px)` for info-cards and subtle parralax on background images.

## 3. Psychological Sound Design
- **Sound Mapping**: Every visual motion must have a corresponding SFX.
  - *Pop-up card* → Small "pop" or "whoosh".
  - *Topic switch* → Deep "thud" or "glitch".
- **Dynamic BGM**: Side-chain the music volume to the narration (ducking) to ensure clarity.

## 4. Technical Mastering for Viral Delivery
- **4K Ultra HD**: Always target 4K to defeat platform compression.
- **Color Correction**: Use `filter: contrast(1.1) saturate(1.2)` for a "punchy" social media look.
- **Deterministic Complexity**: Ensure all random particles or effects are frame-deterministic so they render identically every time.

## 5. Implementation Workflow (Remotion Specific)
- **Spring-Based Movement**: Never use linear interpolation for primary UI elements.
  ```tsx
  const spr = spring({ frame, fps, config: { stiffness: 100, damping: 10 } });
  ```
- **Text Measurement**: Use `@remotion/layout-utils` to ensure text never clips on mobile screens.
- **Sequence Management**: Use `<Series.Sequence>` for chronological narratives and `<AbsoluteFill>` for persistent overlays (HUDs, Watermarks).

## Quality Checklist for "Million" Quality
- [ ] No static frames longer than 1.5 seconds.
- [ ] Subtitles are bold, clear, and perfectly synced (1-3 words at a time).
- [ ] Visual zoom/movement reflects the emotion of the narration.
- [ ] Header/UI elements have a subtle "breathing" or glowing animation.
- [ ] Audio volume is balanced (BGM doesn't drown out narration).
- [ ] First scene provides an instant "Why should I watch this?" impact.
