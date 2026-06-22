# Remotion demo video

Vertical roadshow demo for the Xiaohongshu local advisor prototype.

Composition:

- `AdvisorDemoVideo`
- 1080 x 1920
- 30 fps
- 1200 frames / 40 seconds

Source:

- `index.tsx` registers the composition.
- `src/AdvisorDemoVideo.tsx` owns the timeline.
- `src/components.tsx` contains the phone frame, captions, phone-internal highlights, tap pulses, and cards.
- `src/assets.ts` contains copy, timing, colors, and screenshot references.
- Repo-root `public/ui/*.png` are the local UI screenshots used by Remotion's static asset loader.
- `video/remotion/public/ui/*.png` keeps a colocated copy of the same screenshots for the video source folder.
- Highlight overlays use fixed coordinates inside the phone viewport, so they should be recalibrated if the UI screenshots change.

Render examples:

```powershell
npm exec --yes --package @remotion/cli --package remotion --package react --package react-dom -- remotion compositions video/remotion/index.tsx
npm exec --yes --package @remotion/cli --package remotion --package react --package react-dom -- remotion still video/remotion/index.tsx AdvisorDemoVideo output/remotion/advisor-demo-cover-optimized.png --frame=40
npm exec --yes --package @remotion/cli --package remotion --package react --package react-dom -- remotion render video/remotion/index.tsx AdvisorDemoVideo output/remotion/advisor-demo-video-optimized.mp4 --codec=h264 --crf=20
```
