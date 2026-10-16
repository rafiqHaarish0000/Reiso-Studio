/**
 * MotionLab feature registry.
 * Every entry maps to a real preview component (see components/previews).
 */

export const BASE_PROMPT =
  "You are an expert frontend developer specializing in premium Framer-style websites, " +
  "creative UI interactions, animation, and motion design. Implement only the requested " +
  "feature in my existing project. Inspect the current project structure, preserve unrelated " +
  "components and functionality, and follow the existing design system. Create a polished, " +
  "responsive, accessible implementation with appropriate animation timing, smooth easing, " +
  "performance optimization, and reduced-motion support. Reuse existing dependencies and " +
  "avoid unnecessary packages. Verify the implementation on desktop and mobile.";

export const CATEGORIES = [
  "Typography",
  "Images & Media",
  "Buttons & CTAs",
  "Navigation",
  "Cards & Grids",
  "Scroll Animations",
  "Background Effects",
  "Advanced Interactions",
  "Layout & Composition",
  "3D & Cinematic Effects",
  "Essential UI Features",
];

const DEFAULTS = {
  Typography: {
    interaction: "Plays on load, and replays on hover or scroll into view.",
    responsive: "Type scales fluidly with clamp(); reveals stay legible down to 320px.",
    accessibility: "Text remains real, selectable and screen-reader friendly; animation is skipped under reduced-motion.",
    performance: "Only transform/opacity are animated; glyph splitting is memoized.",
  },
  "Images & Media": {
    interaction: "Triggered by pointer movement, hover, drag or scroll within the preview.",
    responsive: "Media is object-fit: cover and reflows to a single column on small screens.",
    accessibility: "Images keep descriptive alt text; interactive media is keyboard operable.",
    performance: "Images are lazy-loaded and use GPU-friendly transforms.",
  },
  "Buttons & CTAs": {
    interaction: "Responds to hover, focus, active/pressed and disabled states.",
    responsive: "Tap targets stay at least 44px on touch devices.",
    accessibility: "Real <button>/<a> elements with visible focus rings and aria states.",
    performance: "Animations use transform/opacity and are interruptible.",
  },
  Navigation: {
    interaction: "Responds to hover, scroll position and clicks; menus open and close.",
    responsive: "Collapses into a compact, touch-friendly menu on mobile.",
    accessibility: "Uses <nav>/<ul> semantics, aria-expanded and Escape-to-close.",
    performance: "Scroll listeners are passive and throttled with rAF.",
  },
  "Cards & Grids": {
    interaction: "Hover, focus and click drive the card states; lists may scroll or drag.",
    responsive: "Grid drops from 3 to 2 to 1 column as the viewport narrows.",
    accessibility: "Cards are focusable and expose their action to assistive tech.",
    performance: "Offscreen cards are not animated until visible.",
  },
  "Scroll Animations": {
    interaction: "Driven by scrolling inside the dedicated preview surface.",
    responsive: "Distance and pin lengths adapt to viewport height.",
    accessibility: "Progress is decorative; all content is reachable without motion.",
    performance: "Scroll progress is read via rAF and applied with transforms.",
  },
  "Background Effects": {
    interaction: "Ambient motion, optionally reacting to pointer position.",
    responsive: "Effect density and sizes adapt to viewport size.",
    accessibility: "Marked aria-hidden as pure decoration; disabled under reduced-motion.",
    performance: "Runs on a single canvas or CSS layer and pauses when off-screen.",
  },
  "Advanced Interactions": {
    interaction: "Driven directly by pointer, click, keyboard and drag input.",
    responsive: "Touch equivalents are provided for hover-only behaviours.",
    accessibility: "Full keyboard support with ARIA roles and states.",
    performance: "Listeners are cleaned up and effects pause when the preview is hidden.",
  },
  "Layout & Composition": {
    interaction: "Hover highlights and scroll pinning reveal the composition.",
    responsive: "Editorial grids recompose into a single stacked column on mobile.",
    accessibility: "Reading order matches the DOM order regardless of visual placement.",
    performance: "Uses CSS grid/flex; no layout thrash on scroll.",
  },
  "3D & Cinematic Effects": {
    interaction: "Driven by pointer position, drag or scroll with real perspective.",
    responsive: "Perspective and scale reduce gracefully on small screens.",
    accessibility: "Provides a static fallback and honours reduced-motion.",
    performance: "Prefers transform3d/perspective; heavy shaders are avoided when possible.",
  },
  "Essential UI Features": {
    interaction: "Responds to clicks, keyboard navigation and focus states.",
    responsive: "Layouts and controls adapt to mobile widths.",
    accessibility: "Fully keyboard operable with appropriate ARIA roles and labels.",
    performance: "Lightweight; loops are paused when off-screen or hidden.",
  },
};

/**
 * [title, category, previewKey, description, keywords, behavior, difficulty]
 */
const RAW = [
  // A. Typography — 1-20
  ["Oversized Hero Typography","Typography","OversizedHeroType","A massive display headline that dominates the viewport on load.","hero,display,type,scale","A single headline sized with clamp() that fills the viewport, revealing line by line with a slight upward drift and a tight tracking that widens on hover.","Beginner"],
  ["Word-by-Word Reveal","Typography","WordReveal","Headline animates in one word at a time with a soft stagger.","words,stagger,reveal","Splits the headline into words, wraps each in an overflow-hidden line, and raises each word from below with an eased stagger on view.","Beginner"],
  ["Character-by-Character Reveal","Typography","CharReveal","Headline resolves letter by letter.","characters,stagger,type","Splits text into individual glyphs and fades/translates each with a fast stagger, replaying on hover of the preview.","Intermediate"],
  ["Text Masking Reveal","Typography","TextMaskReveal","Text is revealed through an expanding mask or clip-path.","mask,clip,wipe,reveal","A clip-path wipe sweeps across the headline while a color block recedes, revealing the full text underneath.","Intermediate"],
  ["Scroll-Triggered Text Reveal","Typography","ScrollTextReveal","Headline reveals progressively as the reader scrolls.","scroll,reveal,progress","Word opacity is linked to scroll progress inside the preview, so the sentence 'lights up' word by word as you scroll.","Intermediate"],
  ["Gradient Text","Typography","GradientTextFx","Text filled with an animated gradient.","gradient,fill,animated","A background-clip: text gradient moves across the headline on a slow infinite loop with a rest state on hover.","Beginner"],
  ["Scramble Text Effect","Typography","ScrambleText","Characters scramble then resolve into the final text.","scramble,decode,glitch","On load and hover, each character cycles through random glyphs before locking into place, left to right.","Intermediate"],
  ["Variable Font Interaction","Typography","VariableFont","Weight and width respond to the pointer.","variable,weight,interaction","Pointer position maps to font-variation-settings weight/width, producing a living, responsive type specimen.","Advanced"],
  ["Typewriter Headline","Typography","Typewriter","Text types itself out with a blinking caret.","typewriter,caret,loop","Characters are typed at a steady cadence with a blinking caret; the line deletes and retypes in a loop.","Beginner"],
  ["Split-Color Typography","Typography","SplitColorType","Each line uses a contrasting color split.","color,split,duotone","Alternating words use accent and foreground colors, with a hover that swaps the two halves.","Beginner"],
  ["Line-by-Line Reveal","Typography","LineReveal","Headline rises line by line behind masks.","lines,reveal,mask","Each line of the headline sits in an overflow-hidden track and slides up into place with a staggered delay on view.","Beginner"],
  ["Rotating Word Carousel","Typography","RotatingWords","A single word cycles through a set.","rotate,words,carousel","One word holds while the next rolls in from below, cycling through a list on a timed loop with a spring.","Beginner"],
  ["Marker Highlight Sweep","Typography","MarkerHighlight","A highlight sweeps across the text.","highlight,marker,sweep","A colored highlight bar animates behind words left to right, as if marked with a pen, then holds.","Beginner"],
  ["Blur-In Headline","Typography","BlurInHeadline","Text focuses in from a blur.","blur,focus,reveal","The headline starts blurred and slightly scaled, then sharpens and settles with an eased transition.","Beginner"],
  ["Outline-to-Fill Text","Typography","OutlineFillText","Stroke-only text fills with color.","outline,fill,stroke","Text renders as an outline and fills with color on hover using a layered clip, with a soft transition.","Intermediate"],
  ["Image-Filled Text","Typography","ImageFillText","An image is clipped to the letterforms.","image,clip,fill","A moving gradient is clipped to the headline via background-clip: text, drifting slowly across it.","Intermediate"],
  ["Glitch Text","Typography","GlitchText","Text suffers RGB split glitches.","glitch,rgb,split","The headline occasionally splits into red and cyan offset copies with a quick jitter, then resolves.","Intermediate"],
  ["Kinetic Scrolling Headline","Typography","KineticHeadline","Type scales and loops like a kinetic banner.","kinetic,marquee,loop","Words scroll horizontally and change size and weight as they pass centre on a continuous loop.","Advanced"],
  ["Animated Underline Links","Typography","AnimatedUnderline","Links grow an underline on hover.","underline,link,hover","A set of inline links each reveal a sliding underline from left to right on hover or focus.","Beginner"],
  ["Letter-Spacing Title","Typography","TitleTracking","Title tracking expands on load.","tracking,spacing,title","The title starts tightly tracked and widens into place while fading in, with a hover densify.","Beginner"],

  // B. Images & Media — 21-40
  ["Full-Screen Hero Image","Images & Media","FullScreenHeroImg","A cinematic full-bleed hero image.","hero,fullscreen,image","A full-bleed image with a slow Ken-Burns scale-in and a gradient scrim so overlaid text stays readable.","Beginner"],
  ["Image Reveal Animation","Images & Media","ImageReveal","Images wipe into view with a mask.","reveal,mask,wipe","On scroll, each image is uncovered by an expanding clip-path while it scales from 1.1 to 1.","Intermediate"],
  ["Parallax Image","Images & Media","ParallaxImage","Image moves at a different rate than the page.","parallax,depth,scroll","The image translates within its frame based on scroll progress, creating depth without moving the layout.","Intermediate"],
  ["Image Zoom on Hover","Images & Media","ImageZoomHover","Image scales up smoothly on hover.","zoom,hover,scale","Hovering scales the image to 1.08 with an eased transition and a subtle darkening overlay.","Beginner"],
  ["Grayscale-to-Color Image","Images & Media","GrayscaleColor","Images start monochrome and gain color.","grayscale,color,hover","Images render in grayscale and saturate to full color on hover or focus.","Beginner"],
  ["Floating Image Composition","Images & Media","FloatingImage","Layered images drift gently in space.","float,layers,drift","Several images float with independent looping y-drift and rotation, layered with soft shadows.","Intermediate"],
  ["Cursor-Following Image","Images & Media","CursorFollowImage","A preview image trails the cursor.","cursor,follow,mask","Moving the pointer inside the preview reveals a thumbnail that follows with a soft spring lag.","Intermediate"],
  ["Image Tilt Interaction","Images & Media","ImageTilt","Image tilts in 3D toward the pointer.","tilt,3d,pointer","Pointer position maps to rotateX/rotateY with perspective, snapping back on leave.","Intermediate"],
  ["Before-and-After Slider","Images & Media","BeforeAfterSlider","A draggable slider compares two images.","compare,slider,drag","A draggable handle moves a clip-path divider between the before and after images; supports keyboard arrows.","Intermediate"],
  ["Cinematic Video Hero","Images & Media","VideoHero","A looping video hero with overlay content.","video,hero,cinematic","A muted autoplay loop sits behind a gradient and headline, with a play/pause control for the video.","Intermediate"],
  ["Ken Burns Slideshow","Images & Media","KenBurnsSlideshow","A slideshow with slow pan and zoom.","slideshow,kenburns,zoom","Each image scales and pans slowly while cross-fading to the next on a timed loop.","Intermediate"],
  ["Image Stack Swipe","Images & Media","ImageStackSwipe","A deck of images can be swiped away.","stack,swipe,deck","Stacked image cards can be dragged or clicked to send the top card away and reveal the next.","Intermediate"],
  ["Duotone Hover Image","Images & Media","DuotoneImage","Images switch to a duotone treatment.","duotone,tint,hover","Hovering blends the image into a two-tone accent gradient while the base stays muted.","Beginner"],
  ["Image Grid Reveal","Images & Media","ImageGridReveal","A grid of images reveals in sequence.","grid,reveal,stagger","Tiles unmask one after another with a stagger when the grid enters view.","Intermediate"],
  ["Circular Reveal Image","Images & Media","CircleRevealImage","An image opens through an expanding circle.","circle,clip,reveal","A circular clip-path expands from the centre to reveal the image over a muted backdrop.","Beginner"],
  ["Split Image Hover","Images & Media","ImageSplitHover","Two images split apart on hover.","split,halves,hover","Hovering splits the frame into two halves that slide apart to reveal a second image underneath.","Intermediate"],
  ["Shape-Clip Image","Images & Media","ShapeClipImage","Images masked to organic shapes.","clip,shape,mask","Images are masked into an arch or blob shape that softens further on hover.","Intermediate"],
  ["Parallax Image Columns","Images & Media","ParallaxColumns","Columns drift at different speeds.","parallax,columns,depth","Two or three image columns translate vertically at different rates as the preview scrolls.","Intermediate"],
  ["Image Color Swap","Images & Media","ImageColorSwap","The palette swaps on hover.","color,swap,hue","Hovering shifts the image hue and saturation with a mix-blend color layer.","Beginner"],
  ["Zoom-Lens Image","Images & Media","ZoomLens","A magnifier lens follows the cursor.","zoom,lens,magnifier","A circular lens follows the pointer over the image and shows a magnified copy of the area beneath it.","Advanced"],

  // C. Buttons & CTAs — 41-60
  ["Magnetic Button","Buttons & CTAs","MagneticButton","The button is attracted to the cursor.","magnetic,pointer,spring","Within a radius, the button translates toward the pointer using a spring, returning to origin on leave.","Intermediate"],
  ["Button Fill Animation","Buttons & CTAs","ButtonFill","A fill sweeps across the button on hover.","fill,wipe,hover","A colored layer wipes up from the bottom on hover and text swaps to a contrasting color.","Beginner"],
  ["Arrow-Slide CTA","Buttons & CTAs","ArrowSlideCTA","The arrow slides out while a new one enters.","arrow,slide,cta","Hovering shifts the label left and slides the arrow out-right, with a second arrow entering from the left.","Beginner"],
  ["Glow Button","Buttons & CTAs","GlowButton","The button emits a colored glow.","glow,shadow,hover","Hovering intensifies a soft radial glow and a light sweep animates across the surface.","Beginner"],
  ["Border-Draw Button","Buttons & CTAs","BorderDrawButton","The border draws itself around the button.","border,draw,path","SVG paths draw the button border clockwise on hover, then retract on leave.","Intermediate"],
  ["3D Press Button","Buttons & CTAs","Press3DButton","The button depresses like a physical key.","3d,press,depth","The button is extruded with a bottom shadow; pressing pushes it down and reduces the depth.","Intermediate"],
  ["Text-Swap Button","Buttons & CTAs","TextSwapButton","Label swaps vertically on hover.","text,swap,roll","The label rolls up and out while an identical label rolls in from below, using a masked window.","Beginner"],
  ["Liquid-Style CTA","Buttons & CTAs","LiquidCTA","A gooey liquid blob follows hover.","liquid,blob,goo","An SVG-goo blob stretches and merges with the cursor inside the button for an organic feel.","Advanced"],
  ["Animated Outline CTA","Buttons & CTAs","OutlineCTA","A dashed outline travels around the CTA.","outline,dash,travel","A dashed stroke offset animates continuously around the pill, speeding up on hover.","Intermediate"],
  ["Loading and Success Button","Buttons & CTAs","LoadingSuccessButton","The button shows loading then success.","loading,success,state","Clicking swaps the label for a spinner, then a checkmark with a spring pop and a color change.","Intermediate"],
  ["Sliding Icon Button","Buttons & CTAs","SlidingIconButton","An icon slides in and the label shifts.","icon,slide,button","Hovering slides the icon in from the right while the label shifts left, within an overflow-hidden pill.","Beginner"],
  ["Gradient Border Button","Buttons & CTAs","GradientBorderButton","A gradient border wraps the button.","gradient,border,glow","A conic-gradient ring rotates around the button edge while the face stays solid.","Intermediate"],
  ["Shimmer Button","Buttons & CTAs","ShimmerButton","A shimmer sweeps across on hover.","shimmer,sweep,shine","A light band sweeps diagonally across the button face on hover and on an idle loop.","Beginner"],
  ["Confetti Click Button","Buttons & CTAs","ConfettiButton","Clicks burst into confetti.","confetti,click,burst","Clicking spawns a burst of colored particles that fall and fade from the button centre.","Intermediate"],
  ["Pulse Button","Buttons & CTAs","PulseButton","The button emits a pulsing ring.","pulse,ring,attention","An expanding ring pulses out from the button on a loop to draw attention, pausing on hover.","Beginner"],
  ["Neon Button","Buttons & CTAs","NeonButton","The button glows like neon.","neon,glow,flicker","A neon tube outline glows with a subtle flicker and brightens on hover.","Intermediate"],
  ["Underline Reveal Button","Buttons & CTAs","UnderlineRevealButton","A thick underline wipes in under the label.","underline,wipe,link","Hovering wipes a bold underline in from the left beneath the label and retracts on leave.","Beginner"],
  ["Copy-to-Clipboard Button","Buttons & CTAs","CopyButton","Click copies and confirms.","copy,clipboard,confirm","Clicking swaps the label to a checkmark with a spring and briefly shows a copied confirmation.","Beginner"],
  ["Expand-on-Hover Button","Buttons & CTAs","ExpandButton","The button grows to reveal more.","expand,grow,reveal","Hovering expands the pill width to reveal a secondary label and icon.","Intermediate"],
  ["Blob Button","Buttons & CTAs","BlobButton","A gooey blob morphs behind the label.","blob,goo,morph","A morphing blob wobbles behind the label on a loop and reacts to hover.","Advanced"],

  // D. Navigation — 61-80
  ["Glassmorphism Navbar","Navigation","GlassNavbar","A frosted-glass sticky navbar.","glass,blur,sticky","A translucent, blurred bar with a hairline border that stays legible over any content.","Beginner"],
  ["Hide-on-Scroll Navbar","Navigation","HideOnScrollNavbar","Navbar hides going down, shows going up.","hide,scroll,reveal","The bar slides out on scroll-down and slides back in on scroll-up within the preview.","Intermediate"],
  ["Scroll-Aware Navbar","Navigation","ScrollAwareNavbar","Navbar condenses and gains a background.","scroll,condense,shrink","On scroll the bar shrinks in height, gains a solid background and reduces its link spacing.","Intermediate"],
  ["Animated Navigation Indicator","Navigation","NavIndicator","A pill indicator slides under the active link.","indicator,slide,active","A shared pill animates between the hovered/active links using a layout animation.","Intermediate"],
  ["Full-Screen Navigation Menu","Navigation","FullScreenMenu","A full-screen overlay menu opens.","overlay,menu,fullscreen","Clicking the burger expands a full-screen panel whose links stagger in from below.","Intermediate"],
  ["Mega Menu","Navigation","MegaMenu","A multi-column dropdown menu.","mega,dropdown,columns","Hovering a top item opens a wide panel with grouped columns, icons and a soft entrance.","Advanced"],
  ["Morphing Menu Icon","Navigation","MorphMenuIcon","The burger morphs into a close icon.","morph,burger,icon","The two bars rotate and merge into an X while the menu toggles.","Beginner"],
  ["Floating Pill Navigation","Navigation","FloatingPillNav","A detached pill nav floats above content.","pill,float,detached","A rounded nav floats with a shadow, offset from the top edge, with pill-shaped active states.","Beginner"],
  ["Active Section Tracking","Navigation","ActiveSectionTracking","Nav highlights the section in view.","scrollspy,active,track","As the preview scrolls, the matching nav item is highlighted and an indicator follows.","Intermediate"],
  ["Breadcrumb Animation","Navigation","BreadcrumbAnim","Breadcrumbs reveal with chevrons.","breadcrumb,chevron,path","Breadcrumb items fade in left to right with animated chevron separators that pulse on hover.","Beginner"],
  ["Dropdown Menu","Navigation","DropdownMenu","A simple animated dropdown.","dropdown,menu,list","Hovering or focusing the trigger reveals a list panel with a soft slide and fade.","Beginner"],
  ["Side Drawer Nav","Navigation","SideDrawerNav","A drawer slides in from the side.","drawer,side,panel","A burger opens a side panel that slides in with staggered links and a scrim.","Intermediate"],
  ["Command Palette","Navigation","CommandPalette","A searchable command menu.","command,palette,search","A centred palette with a search field and filtered commands opens with a scale and fade.","Advanced"],
  ["Tab Bar Navigation","Navigation","TabBarNav","An animated bottom tab bar.","tabs,bar,indicator","Selecting a tab slides an indicator and swaps the active icon with a spring.","Beginner"],
  ["Step Progress Nav","Navigation","StepProgressNav","Numbered steps advance with a bar.","steps,progress,wizard","Clicking through steps advances a filling connector and highlights the current node.","Intermediate"],
  ["Sticky Tab Navbar","Navigation","StickyTabNav","A sticky navbar with underline tabs.","sticky,tabs,underline","A sticky bar keeps tabs pinned while an underline tracks the active tab.","Intermediate"],
  ["Back Link with Arrow","Navigation","BackLinkNav","A back link nudges its arrow.","back,arrow,link","The arrow slides left and back on hover for a clear affordance to go back.","Beginner"],
  ["Expandable Search Bar","Navigation","ExpandSearchNav","A search icon expands into a field.","search,expand,input","Clicking the icon expands a compact bar into a focused search input with a placeholder.","Beginner"],
  ["Icon Dock Nav","Navigation","DockNav","A dock magnifies icons.","dock,magnify,icons","Dock icons magnify and lift based on pointer proximity with a smooth scale falloff.","Advanced"],
  ["Segmented Control Nav","Navigation","SegmentedNav","A segmented control slides a thumb.","segmented,control,thumb","A shared thumb slides between segments with a spring while labels swap emphasis.","Beginner"],

  // E. Cards, Grids & Services — 81-100
  ["Staggered Card Entrance","Cards & Grids","StaggeredCards","Cards cascade into view.","stagger,entrance,grid","Cards fade and rise with a staggered delay when scrolled into view.","Beginner"],
  ["Lift-on-Hover Cards","Cards & Grids","LiftHoverCards","Cards lift with depth on hover.","lift,hover,shadow","Hovering raises the card, deepens its shadow and subtly brightens its border.","Beginner"],
  ["Stacking Scroll Cards","Cards & Grids","StackingScrollCards","Cards stack as you scroll.","stack,scroll,pin","Each card pins and stacks over the previous with slight scale reduction as you scroll.","Advanced"],
  ["Horizontal Swipe Cards","Cards & Grids","HorizontalSwipeCards","Cards scroll horizontally with drag.","swipe,drag,horizontal","Cards sit in a horizontal track that can be dragged or arrow-navigated with snapping.","Intermediate"],
  ["Expanding Feature Card","Cards & Grids","ExpandingFeatureCard","One card expands while others shrink.","expand,flex,accordion","Hovering a card expands it with flex-grow while siblings compress, revealing extra detail.","Intermediate"],
  ["3D Flip Card","Cards & Grids","Flip3DCard","The card flips to its reverse.","flip,3d,reveal","Clicking rotates the card 180° on the Y axis to reveal the reverse face with perspective.","Intermediate"],
  ["Spotlight Card","Cards & Grids","SpotlightCard","A spotlight follows the cursor on the card.","spotlight,pointer,radial","Pointer position drives a radial highlight and a subtle border glow inside the card.","Intermediate"],
  ["Bento Grid Layout","Cards & Grids","BentoGrid","An asymmetric bento grid of tiles.","bento,grid,layout","Feature tiles of mixed spans form a bento layout that reflows responsively.","Intermediate"],
  ["Asymmetrical Portfolio Grid","Cards & Grids","AsymPortfolioGrid","An offset editorial portfolio grid.","portfolio,asym,grid","Tiles of varied sizes are offset vertically to create an editorial rhythm.","Intermediate"],
  ["Sticky Services Section","Cards & Grids","StickyServices","A sticky list of services with scrolling detail.","sticky,services,list","A list of service names stays pinned while the matching descriptions scroll beside it.","Advanced"],
  ["Tilt Card","Cards & Grids","TiltCard","The card tilts toward the pointer in 3D.","tilt,3d,pointer","Pointer position drives rotateX/rotateY with perspective and a moving glare, resetting on leave.","Intermediate"],
  ["Gradient Border Card","Cards & Grids","GradientBorderCard","A rotating gradient border frames the card.","gradient,border,glow","A conic-gradient border rotates around the card while the inner face stays clean.","Intermediate"],
  ["Reveal-on-Hover Card","Cards & Grids","RevealHoverCard","Hidden details slide up on hover.","reveal,hover,details","Hovering slides a hidden description panel up from the bottom over a dimmed image.","Beginner"],
  ["Numbered Feature List","Cards & Grids","NumberedFeatureList","Animated rows with big numbers.","list,numbers,rows","Numbered rows stagger in and highlight on hover with a sliding rule.","Beginner"],
  ["Testimonial Grid","Cards & Grids","TestimonialGrid","A grid of rotating quotes.","testimonial,grid,quotes","A grid of testimonial cards lifts on hover with avatars and soft shadows.","Beginner"],
  ["Masonry Grid","Cards & Grids","MasonryGrid","A masonry layout of varied heights.","masonry,columns,grid","Cards of varied heights are packed into columns and fade in with a stagger.","Intermediate"],
  ["Stat Cards","Cards & Grids","StatCards","Cards count their numbers on view.","stats,counter,cards","Stat cards fade in and count their values up when scrolled into view.","Intermediate"],
  ["Image Overlay Cards","Cards & Grids","ImageOverlayCards","Overlay text lifts on hover.","overlay,image,cards","Image cards darken and raise their overlay text with a soft zoom on hover.","Beginner"],
  ["Card Ring","Cards & Grids","CardRing","Cards sit on a rotating ring.","ring,orbit,carousel","Cards are arranged around a ring that rotates as you drag or on a loop.","Advanced"],
  ["Card Deck","Cards & Grids","CardDeck","A draggable deck of cards.","deck,drag,stack","A fanned deck can be dragged aside card by card to reveal the ones beneath.","Advanced"],

  // F. Scroll Animations — 101-120
  ["Smooth Scrolling","Scroll Animations","SmoothScrolling","Inertial smooth scrolling.","smooth,lerp,inertia","Scroll input is damped with a lerp so the content glides instead of jumping.","Intermediate"],
  ["Parallax Sections","Scroll Animations","ParallaxSections","Sections move at different speeds.","parallax,sections,depth","Background and foreground layers translate at different rates as the preview scrolls.","Intermediate"],
  ["Scroll Progress Indicator","Scroll Animations","ScrollProgress","A bar shows reading progress.","progress,bar,reading","A top progress bar fills in proportion to the scroll position of the preview.","Beginner"],
  ["Horizontal Scroll Storytelling","Scroll Animations","HorizontalStory","Vertical scroll drives horizontal motion.","horizontal,story,scrub","Vertical scrolling is mapped to horizontal translation of a card lane for a side-scrolling story.","Advanced"],
  ["Scroll-Linked Image Zoom","Scroll Animations","ScrollLinkedZoom","An image zooms as you scroll.","zoom,scroll,scrub","Scroll progress scales an image from 1 to 1.4 inside a pinned frame.","Intermediate"],
  ["Section Fade Transition","Scroll Animations","SectionFade","Sections cross-fade on scroll.","fade,section,opacity","Outgoing sections fade out while the next fades in as each crosses the viewport centre.","Beginner"],
  ["Page Transition Overlay","Scroll Animations","PageTransitionOverlay","A colored overlay wipes between pages.","transition,overlay,wipe","Clicking 'next' slides a full-screen color panel across, then reveals the new view.","Advanced"],
  ["Curtain Reveal","Scroll Animations","CurtainReveal","Panels split open like curtains.","curtain,split,reveal","Two panels slide apart to reveal the content behind, with a spring ease.","Intermediate"],
  ["Scroll-Controlled Text Color","Scroll Animations","ScrollTextColor","Text color tracks scroll progress.","color,scroll,scrub","A paragraph's per-word color blends from muted to foreground based on scroll progress.","Intermediate"],
  ["Pinned Storytelling Sequence","Scroll Animations","PinnedStory","Steps play while a section stays pinned.","pin,story,steps","The section pins while numbered steps cross-fade in sequence as you keep scrolling.","Advanced"],
  ["Scroll Velocity Text","Scroll Animations","VelocityText","Text speeds up with scroll velocity.","velocity,marquee,scroll","A marquee row accelerates and reverses its direction based on the scroll speed inside the preview.","Advanced"],
  ["Sticky Horizontal Gallery","Scroll Animations","StickyHorizontalGallery","A pinned gallery scrolls sideways.","sticky,horizontal,gallery","A pinned section translates a horizontal image lane as the preview scrolls vertically.","Advanced"],
  ["Scroll-Linked Background","Scroll Animations","ScrollBackgroundShift","The backdrop colour shifts on scroll.","background,color,shift","Scroll progress blends the backdrop gradient between two palettes inside the preview.","Intermediate"],
  ["Scroll Progress Steps","Scroll Animations","ScrollSteps","Steps light up with progress.","steps,progress,scroll","A vertical list of steps activates one by one as the preview scrolls past each.","Intermediate"],
  ["Scroll Snap Sections","Scroll Animations","ScrollSnapSections","Full sections snap into place.","snap,sections,scroll","The preview uses scroll-snap so each full-height section clicks into the viewport.","Intermediate"],
  ["Reveal on Enter","Scroll Animations","RevealOnEnter","Blocks rise as they enter view.","reveal,enter,stagger","Blocks fade and rise with a stagger each time they enter the preview viewport.","Beginner"],
  ["Scroll-Zoom Hero","Scroll Animations","ScrollZoomHero","A hero zooms out as you scroll.","zoom,hero,scroll","Scroll progress scales a hero panel from enlarged to settled while text parallaxes.","Intermediate"],
  ["Scroll Marquee","Scroll Animations","ScrollMarquee","The marquee position tracks scroll.","marquee,scrub,scroll","Horizontal marquee position is scrubbed by scroll offset rather than a timer.","Intermediate"],
  ["Sticky Counters","Scroll Animations","StickyCounters","Counters animate while pinned.","sticky,counter,stats","A pinned stats strip counts up its numbers as the preview scrolls into it.","Intermediate"],
  ["Scroll-Driven Mask","Scroll Animations","ScrollMask","A mask wipes with scroll progress.","mask,wipe,scroll","Scroll progress drives a clip-path wipe that reveals an image behind a panel.","Advanced"],

  // G. Background Effects — 121-140
  ["Animated Gradient Background","Background Effects","AnimatedGradient","A slowly shifting gradient backdrop.","gradient,animate,background","A multi-stop gradient drifts on a long loop with a subtle grain overlay.","Beginner"],
  ["Aurora Background","Background Effects","Aurora","Soft aurora-like ribbons of color.","aurora,ribbon,blur","Blurred colored blobs drift and blend to produce aurora bands behind the content.","Intermediate"],
  ["Grain Texture","Background Effects","GrainTexture","A film-grain texture overlay.","grain,noise,texture","An animated SVG-noise layer adds tactile film grain at low opacity.","Beginner"],
  ["Glassmorphism Panels","Background Effects","GlassPanels","Frosted glass content panels.","glass,blur,panel","Panels use backdrop blur, translucency and hairline borders over a colorful backdrop.","Beginner"],
  ["Cursor-Following Glow","Background Effects","CursorGlow","A glow tracks the pointer.","glow,cursor,radial","A large radial glow follows the pointer across the preview with a soft lag.","Beginner"],
  ["Animated Grid Background","Background Effects","AnimatedGrid","A grid illuminates near the cursor.","grid,cells,spotlight","A fine grid lights up cells near the pointer and gently pulses over time.","Intermediate"],
  ["Particle Background","Background Effects","ParticleBackground","Drifting particle field.","particles,canvas,motion","Canvas particles drift and link with faint lines, pausing when off-screen.","Advanced"],
  ["Liquid Gradient Blobs","Background Effects","LiquidBlobs","Gooey blobs morph and merge.","liquid,blobs,goo","SVG-goo blobs stretch, morph and merge on a slow loop.","Advanced"],
  ["Spotlight Reveal Background","Background Effects","SpotlightReveal","Content is revealed by a spotlight.","spotlight,reveal,mask","Moving the pointer reveals a brighter layer through a soft radial mask.","Intermediate"],
  ["Animated Border Glow","Background Effects","AnimatedBorderGlow","A glowing border travels around a panel.","border,glow,conic","A conic-gradient border rotates continuously, with a soft outer bloom.","Intermediate"],
  ["Dot Grid","Background Effects","DotGrid","A subtle animated dot grid.","dot,grid,pattern","A dot lattice breathes with a slow radial pulse that follows the pointer.","Beginner"],
  ["Conic Aurora","Background Effects","ConicAurora","A rotating conic aurora.","conic,aurora,gradient","A conic gradient rotates slowly and blends into soft purple and teal aurora bands.","Intermediate"],
  ["Starfield","Background Effects","Starfield","Stars drift toward the viewer.","stars,space,drift","Points streaming from the centre give a gentle warp-drive starfield effect.","Intermediate"],
  ["Gradient Mesh","Background Effects","GradientMesh","A morphing gradient mesh.","mesh,gradient,morph","Blurred color fields drift and overlap into an evolving mesh gradient.","Intermediate"],
  ["Radial Pulse","Background Effects","RadialPulse","Concentric rings pulse outward.","radial,pulse,rings","Concentric rings expand and fade from the centre on a loop.","Beginner"],
  ["Diagonal Stripes","Background Effects","DiagonalStripes","Animated diagonal stripes.","stripes,diagonal,pattern","Diagonal stripes slowly translate across the surface with a soft vignette.","Beginner"],
  ["Floating Orbs","Background Effects","FloatingOrbs","Glowing orbs float and drift.","orbs,float,glow","Several glowing orbs float with independent motion and blend additively.","Beginner"],
  ["Grid Warp","Background Effects","GridWarp","A grid warps near the pointer.","grid,warp,pointer","A perspective grid bends and brightens around the pointer for a retro-future feel.","Advanced"],
  ["Spotlight Grid","Background Effects","SpotlightGrid","Grid cells light near the cursor.","spotlight,grid,cells","A masked highlight reveals a bright grid layer only within a circle around the pointer.","Intermediate"],
  ["Topography Lines","Background Effects","TopographyLines","Contour lines ripple slowly.","topography,contour,lines","Layered contour lines drift and ripple to suggest a topographic map.","Advanced"],

  // H. Advanced Interactions — 141-160
  ["Custom Cursor","Advanced Interactions","CustomCursor","The cursor is replaced by a custom dot.","cursor,custom,dot","A custom dot-and-ring cursor replaces the native pointer within the preview and grows over targets.","Intermediate"],
  ["Cursor Follower","Advanced Interactions","CursorFollower","An element trails the cursor.","follower,spring,trail","A soft circle trails the pointer with spring physics and inverts over content.","Beginner"],
  ["Magnetic Link","Advanced Interactions","MagneticLink","Links pull toward the cursor.","magnetic,link,attract","Link labels translate slightly toward the pointer when hovered, snapping back on leave.","Intermediate"],
  ["Number Counter","Advanced Interactions","NumberCounter","Numbers count up when in view.","counter,count,stat","Animated counters ease from zero to the target value, replaying when clicked.","Beginner"],
  ["Accordion Animation","Advanced Interactions","Accordion","Panels expand and collapse.","accordion,expand,collapse","Rows expand with a height animation, rotating the chevron and fading the body in.","Beginner"],
  ["Tabs Transition","Advanced Interactions","TabsTransition","Tab panels cross-fade with an indicator.","tabs,indicator,panel","A layout-animated indicator slides under the active tab while panels cross-fade.","Intermediate"],
  ["Custom Tooltip","Advanced Interactions","CustomTooltip","Rich tooltips follow hover/focus.","tooltip,popover,hover","Tooltips appear above the target with a spring, staying within the viewport edges.","Beginner"],
  ["Drag-and-Drop Interaction","Advanced Interactions","DragDrop","Items can be reordered by dragging.","drag,drop,reorder","Draggable list items reorder with layout animations and a lifted drag state.","Advanced"],
  ["Sortable List","Advanced Interactions","SortableList","Reorder a list with drag handles.","sortable,drag,reorder","Rows reorder smoothly with layout animations while dragging by their handle.","Intermediate"],
  ["Multi-Select Chips","Advanced Interactions","MultiSelectChips","Toggle tags in and out.","chips,select,tags","Chips toggle selected state with a spring and a small count updates live.","Beginner"],
  ["Rating Stars","Advanced Interactions","RatingStars","Star rating fills on hover.","rating,stars,hover","Hovering previews a fill across the stars and clicking locks the rating with a pop.","Beginner"],
  ["Password Strength Meter","Advanced Interactions","PasswordMeter","A meter scores password strength.","password,strength,meter","Typing updates a strength bar and checklist live as the password gains variety.","Intermediate"],
  ["Range Slider","Advanced Interactions","RangeSlider","A custom draggable slider.","range,slider,drag","A styled track and thumb updates a live value as you drag or use the keyboard.","Intermediate"],
  ["Stepper Input","Advanced Interactions","StepperInput","A plus/minus quantity stepper.","stepper,input,quantity","Plus and minus buttons adjust a value with a subtle press animation and bounds.","Beginner"],
  ["Custom Select","Advanced Interactions","CustomSelect","A styled dropdown select.","select,dropdown,custom","A custom select opens a styled option list with a check on the chosen item.","Intermediate"],
  ["Color Picker","Advanced Interactions","ColorPicker","Pick a color from swatches.","color,picker,swatch","Selecting a swatch updates a preview chip and label with a smooth transition.","Beginner"],
  ["Skeleton Loader","Advanced Interactions","SkeletonLoader","Content shimmers while loading.","skeleton,loading,shimmer","Placeholder blocks shimmer, then resolve into real content on a loop.","Beginner"],
  ["Progress Ring","Advanced Interactions","ProgressRing","An animated circular progress.","progress,ring,circular","A circular ring animates its stroke to a target percentage and counts the value up.","Intermediate"],

  ["Range Slider","Advanced Interactions","RangeSlider","A custom draggable slider.","range,slider,drag","A styled track and thumb updates a live value as you drag or use the keyboard.","Intermediate"],
  ["Stepper Input","Advanced Interactions","StepperInput","A plus/minus quantity stepper.","stepper,input,quantity","Plus and minus buttons adjust a value with a subtle press animation and bounds.","Beginner"],
  // I. Layout & Composition — 161-180
  ["Editorial Layout","Layout & Composition","EditorialLayout","Magazine-style multi-column layout.","editorial,columns,magazine","A refined editorial grid mixes a large lead paragraph with offset captions and rules.","Intermediate"],
  ["Full-Bleed Section","Layout & Composition","FullBleed","A section that breaks the container.","fullbleed,edge,container","A section escapes the content container to span the full viewport width.","Beginner"],
  ["Overlapping Section","Layout & Composition","OverlappingSection","Elements overlap intentionally.","overlap,depth,layers","A panel overlaps the image and heading above it, creating depth with z-index control.","Intermediate"],
  ["Split-Screen Hero","Layout & Composition","SplitScreenHero","A 50/50 split hero.","split,hero,two-up","A two-column hero with copy on one side and media on the other, stacking on mobile.","Beginner"],
  ["Sticky Sidebar","Layout & Composition","StickySidebar","A sidebar stays pinned while content scrolls.","sticky,sidebar,pin","The sidebar pins while the longer content column scrolls past it.","Intermediate"],
  ["Hover-Driven Image Grid","Layout & Composition","HoverImageGrid","Hovering a list previews its image.","hover,image,preview","Hovering a project row swaps a large preview image with a cross-fade.","Intermediate"],
  ["Responsive Typography Scale","Layout & Composition","ResponsiveTypeScale","A fluid modular type scale.","fluid,clamp,scale","A modular scale built on clamp() that stays balanced from 320px to 1920px.","Beginner"],
  ["Dynamic Whitespace","Layout & Composition","DynamicWhitespace","Spacing adapts to the viewport.","spacing,rhythm,space","Section rhythm scales with the viewport using fluid spacing tokens.","Beginner"],
  ["Layered Depth Composition","Layout & Composition","LayeredDepth","Layered elements at different depths.","layers,depth,z-index","Multiple layers at different scales and blurs create a sense of depth.","Intermediate"],
  ["Sticky Split Layout","Layout & Composition","StickySplit","One half pins while the other scrolls.","sticky,split,pin","A sticky media half stays fixed while a scrolling text half advances through steps.","Advanced"],

  ["Asymmetric Columns","Layout & Composition","AsymmetricColumns","A wide and narrow column pair.","columns,asymmetric,editorial","A dominant column is balanced by a narrow rail that stays aligned on a baseline grid.","Beginner"],
  ["Overlapping Headline","Layout & Composition","OverlapHeadline","Text overlaps an image intentionally.","overlap,headline,z-index","A large headline sits half over an image with controlled z-index and blend.","Intermediate"],
  ["Card Stack Section","Layout & Composition","CardStackSection","Cards overlap in a stack.","stack,cards,overlap","Offset cards overlap with shadows to build depth and reveal on hover.","Intermediate"],
  ["Split Feature List","Layout & Composition","SplitFeatureList","Asymmetric feature rows with media.","split,features,rows","Alternating rows pair copy with media, reversing sides down the list.","Beginner"],
  ["Timeline Layout","Layout & Composition","TimelineLayout","A vertical timeline with milestones.","timeline,milestones,vertical","Milestones sit on a vertical rail with markers that highlight as they enter view.","Intermediate"],
  ["Sticky Header Table","Layout & Composition","StickyTable","A table with a sticky header.","table,sticky,header","A compact data table keeps its header pinned while rows scroll beneath.","Intermediate"],
  ["Dashboard Grid","Layout & Composition","DashboardGrid","A modular dashboard layout.","dashboard,grid,widgets","Widget tiles of mixed sizes form an analytics-style dashboard grid.","Intermediate"],
  ["Narrow Column","Layout & Composition","NarrowColumn","A centered measure for reading.","measure,read,column","A narrow centered column keeps an optimal measure with generous vertical rhythm.","Beginner"],
  ["Image Text Overlay","Layout & Composition","ImageTextOverlay","Text overlays media with a scrim.","overlay,scrim,media","A gradient scrim keeps overlaid text legible over full-bleed media.","Beginner"],
  ["Collage Layout","Layout & Composition","CollageLayout","An off-grid collage of blocks.","collage,offgrid,composition","Blocks placed off the grid overlap and rotate slightly for a collage feel.","Advanced"],
  // J. 3D & Cinematic — 91-100
  ["3D Rotating Object","3D & Cinematic Effects","Rotating3DObject","A CSS 3D object rotates continuously.","3d,cube,rotate","A perspective cube made of CSS faces rotates on two axes, responding to pointer.","Intermediate"],
  ["3D Parallax Layers","3D & Cinematic Effects","Parallax3DLayers","Layers shift in 3D with the pointer.","3d,parallax,pointer","Pointer movement translates layers on a Z plane for real parallax depth.","Intermediate"],
  ["Scroll-Driven 3D Rotation","3D & Cinematic Effects","Scroll3DRotation","Scroll rotates a 3D object.","scroll,3d,rotate","Scroll progress maps to rotationY of a 3D card, scrubbing the turn.","Advanced"],
  ["Perspective Image Gallery","3D & Cinematic Effects","PerspectiveGallery","A gallery arranged in perspective.","perspective,gallery,3d","Images sit on a perspective plane, sliding as you move the pointer.","Advanced"],
  ["Liquid Image Distortion","3D & Cinematic Effects","LiquidDistortion","Images warp like liquid.","distortion,filter,svg","An SVG turbulence filter displaces the image, intensifying near the pointer.","Advanced"],
  ["Morphing SVG Shapes","3D & Cinematic Effects","MorphSVG","SVG shapes morph between forms.","svg,morph,path","A path morphs between a circle, a blob and a star on a loop.","Intermediate"],
  ["Animated 3D Typography","3D & Cinematic Effects","D3DTypography","Headline rendered with 3D depth.","3d,type,depth","Extruded heading layers rotate slightly with the pointer using translateZ.","Intermediate"],
  ["Cinematic Zoom Transition","3D & Cinematic Effects","CinematicZoom","A dramatic zoom transition.","zoom,cinematic,transition","Clicking scales and blurs the current view away while the next zooms in from depth.","Intermediate"],
  ["3D Card Carousel","3D & Cinematic Effects","Carousel3D","Cards arranged on a 3D carousel.","carousel,3d,rotate","Cards orbit on a cylinder; arrows rotate the ring with perspective.","Advanced"],
  ["Interactive Globe","3D & Cinematic Effects","InteractiveGlobe","A rotating point globe.","globe,sphere,points","A dotted globe of latitudes/longitudes rotates and tilts with drag.","Advanced"],
  ["3D Tilt Gallery","3D & Cinematic Effects","TiltGallery3D","A row of panels tilts in 3D.","gallery,3d,tilt","A row of image panels tilts and spreads in perspective as the pointer moves.","Intermediate"],
  ["Flip Carousel 3D","3D & Cinematic Effects","FlipCarousel3D","Cards flip as they rotate around.","flip,carousel,3d","A ring of cards rotates to the next slot while the outgoing card flips away.","Advanced"],
  ["Rotating Text Ring","3D & Cinematic Effects","TextRing3D","Text wraps a rotating ring.","ring,text,3d","Characters are placed around a rotating ring so the phrase reads as it turns.","Advanced"],
  ["Cube Gallery","3D & Cinematic Effects","CubeGallery","A 3D cube with an image per face.","cube,gallery,rotate","A draggable cube rotates on two axes showing a different panel per face.","Intermediate"],
  ["Isometric Cards","3D & Cinematic Effects","IsometricCards","Cards float on an isometric plane.","isometric,3d,cards","Cards are placed on an isometric grid and lift with shadows as you hover.","Intermediate"],
  ["Scroll Depth 3D","3D & Cinematic Effects","ScrollDepth3D","Layers recede in 3D on scroll.","depth,scroll,3d","Scroll progress pushes layers back on the Z axis inside a perspective stage.","Advanced"],
  ["Perspective Hero","3D & Cinematic Effects","PerspectiveHero","A hero on a tilted perspective plane.","perspective,hero,3d","A hero panel sits on a tilted plane that straightens as it settles in view.","Intermediate"],
  ["Holographic Card","3D & Cinematic Effects","HolographicCard","A foil card shimmers with the pointer.","holo,foil,shimmer","Pointer position drives a rainbow foil gradient and sparkle across the card.","Advanced"],
  ["Light Sweep 3D","3D & Cinematic Effects","LightSweep3D","A light sweeps across a 3D surface.","light,sweep,3d","A moving specular highlight crosses a tilted 3D panel on a slow loop.","Intermediate"],
  ["Sphere Gallery","3D & Cinematic Effects","SphereGallery","Images orbit on a sphere.","sphere,orbit,gallery","Thumbnails are distributed on a rotating sphere and scale with depth.","Advanced"],

  // K. Essential UI — 201-220 (currently 207 total; extended below ends at 220)
  ["Animated Logo","Essential UI Features","AnimatedLogo","A logo that draws itself.","logo,draw,svg","An SVG logo mark draws and fills in on load, with a hover pulse.","Beginner"],
  ["Preloader Screen","Essential UI Features","Preloader","A branded loading screen.","preloader,loading,counter","A full-cover preloader counts to 100% then wipes away to reveal content.","Intermediate"],
  ["Testimonial Carousel","Essential UI Features","TestimonialCarousel","Rotating testimonials.","testimonial,carousel,quote","Quotes cross-fade on a timer with dot and arrow navigation.","Intermediate"],
  ["FAQ Section","Essential UI Features","FaqSection","An expandable FAQ list.","faq,accordion,questions","Questions expand to reveal answers with an animated chevron and height.","Beginner"],
  ["Animated Pricing Cards","Essential UI Features","PricingCards","Pricing tiers with hover emphasis.","pricing,tiers,plans","A featured plan is highlighted, and cards lift and glow on hover.","Intermediate"],
  ["Contact Form Interactions","Essential UI Features","ContactForm","A form with live validation states.","form,validation,states","Inputs validate on blur with inline messages; submit shows a loading then success state.","Intermediate"],
  ["Animated Footer","Essential UI Features","AnimatedFooter","A footer that reveals on scroll.","footer,reveal,columns","Footer columns stagger up as the footer enters view, with a marquee of links.","Beginner"],
  ["Infinite Marquee","Essential UI Features","Marquee","An infinite scrolling marquee.","marquee,infinite,loop","Two duplicated tracks scroll seamlessly; direction reverses on hover.","Beginner"],
  ["Logo Wall","Essential UI Features","LogoWall","A grid of partner logos.","logos,wall,grid","Logos sit in a muted grid and brighten on hover with a staggered entrance.","Beginner"],
  ["Notification Bell","Essential UI Features","NotificationBell","A bell with a live badge.","notification,bell,badge","A badge bounces in when a new item arrives and clears with a quick animation.","Beginner"],
  ["Profile Menu","Essential UI Features","ProfileMenu","An avatar opens an account menu.","profile,menu,avatar","Clicking the avatar opens a small menu with a spring and dismisses on outside click.","Intermediate"],
  ["Cookie Banner","Essential UI Features","CookieBanner","A consent banner slides up.","cookie,banner,consent","A consent bar slides up from the bottom and dismisses with a fade on accept.","Beginner"],
  ["Newsletter Signup","Essential UI Features","NewsletterSignup","An input with inline success.","newsletter,signup,form","Submitting validates the email and flips the button to a success tick inline.","Beginner"],
  ["Search Autocomplete","Essential UI Features","SearchAutocomplete","A search field with suggestions.","search,autocomplete,suggestions","Typing filters a suggestion list that opens below with a soft entrance.","Intermediate"],
  ["Empty State","Essential UI Features","EmptyState","A friendly empty placeholder.","empty,state,illustration","An illustrated empty state fades in with a call-to-action button.","Beginner"],
  ["Data Table","Essential UI Features","DataTable","A sortable compact table.","table,data,sort","A compact table with rows that highlight on hover and sortable columns.","Intermediate"],
  ["Chat Bubbles","Essential UI Features","ChatBubbles","A chat thread with typing dots.","chat,bubbles,typing","Message bubbles rise in sequence with a typing indicator before a reply.","Intermediate"],
  ["Onboarding Steps","Essential UI Features","OnboardingSteps","A guided multi-step flow.","onboarding,steps,guide","A stepper advances through onboarding screens with progress dots and next actions.","Intermediate"],
  ["404 State","Essential UI Features","NotFoundState","A playful not-found screen.","404,error,notfound","A large 404 number drifts gently with a back-home action beneath it.","Beginner"],
  ["Back-to-Top Button","Essential UI Features","BackToTop","A button that returns to the top.","back-to-top,scroll,button","A floating button appears after scrolling, animating back to the top with an arrow.","Beginner"],
];

function buildPrompt(f) {
  return [
    BASE_PROMPT,
    "",
    `FEATURE: ${f.number}. ${f.title} (${f.category})`,
    `GOAL: ${f.behavior}`,
    `INTERACTION: ${f.interaction}`,
    `RESPONSIVE: ${f.responsive}`,
    `ACCESSIBILITY: ${f.accessibility}`,
    `PERFORMANCE: ${f.performance}`,
    "",
    `Implement this as a self-contained, reusable component. Match the visual language of my project, ` +
      `keep the animation smooth and interruptible, and make sure it works on both desktop and mobile. ` +
      `Suggested keywords: ${f.keywords.join(", ")}.`,
  ].join("\n");
}

const USES = {
  Typography: ["Hero sections", "Editorial pages", "Brand storytelling"],
  "Images & Media": ["Portfolio galleries", "Product pages", "Editorial features"],
  "Buttons & CTAs": ["Conversion CTAs", "Forms", "Marketing pages"],
  Navigation: ["Marketing sites", "Documentation", "Web apps"],
  "Cards & Grids": ["Feature grids", "Pricing", "Case studies"],
  "Scroll Animations": ["Storytelling pages", "Long-form landing pages", "Product tours"],
  "Background Effects": ["Hero backdrops", "Agency sites", "Product pages"],
  "Advanced Interactions": ["Interactive UI", "Dashboards", "Product tours"],
  "Layout & Composition": ["Editorial grids", "Long-form features", "Agency sites"],
  "3D & Cinematic Effects": ["Immersive heroes", "Product showcases", "Campaign pages"],
  "Essential UI Features": ["Landing pages", "SaaS marketing", "Contact pages"],
};

export const FEATURES = RAW.map(([title, category, preview, description, keywords, behavior, difficulty], i) => {
  const number = i + 1;
  const d = DEFAULTS[category];
  const f = {
    id: `fx-${String(number).padStart(3, "0")}`,
    number,
    title,
    category,
    preview,
    description,
    keywords: keywords.split(","),
    behavior,
    difficulty,
    interaction: d.interaction,
    responsive: d.responsive,
    accessibility: d.accessibility,
    performance: d.performance,
    useCases: USES[category] || ["Marketing sites", "Product landing pages", "Creative portfolios"],
  };
  f.prompt = buildPrompt(f);
  return f;
});

export const CATEGORY_ORDER = CATEGORIES;

export const getFeature = (id) => FEATURES.find((f) => f.id === id);
export const getByNumber = (n) => FEATURES.find((f) => f.number === n);
