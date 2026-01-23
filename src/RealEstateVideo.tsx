import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Audio, staticFile, Series, spring, Img } from 'remotion';
import React from 'react';

const assets = [
    {
        id: 'intro',
        title: 'THE HERITAGE',
        subtitle: 'AZABUDAI',
        audio: staticFile('re_intro.mp3'),
        image: staticFile('re_living.png'),
        duration: 4.5,
    },
    {
        id: 'view',
        title: 'Panorama View',
        subtitle: '180° Tokyo Skyline',
        audio: staticFile('re_feature1.mp3'),
        image: staticFile('re_living.png'), // Reuse but different zoom
        duration: 7,
    },
    {
        id: 'design',
        title: 'Minimalism',
        subtitle: 'Refined Serenity',
        audio: staticFile('re_feature2.mp3'),
        image: staticFile('re_bedroom.png'),
        duration: 8,
    },
    {
        id: 'floorplan',
        title: 'Penthouse Plan',
        subtitle: 'Limited Edition',
        audio: staticFile('re_cta.mp3'),
        image: staticFile('re_floorplan.png'),
        duration: 8,
    }
];

const PremiumScene: React.FC<{ scene: typeof assets[0]; index: number }> = ({ scene, index }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const durationInFrames = scene.duration * fps;

    const spr = spring({
        frame,
        fps,
        config: { stiffness: 40, damping: 12 },
    });

    const zoom = interpolate(frame, [0, durationInFrames], [1.1, 1.3]);
    const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

    return (
        <AbsoluteFill style={{ opacity }}>
            <div style={{ transform: `scale(${zoom})`, width: '100%', height: '100%' }}>
                <Img src={scene.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Cinematic Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)',
            }} />

            {/* Typography */}
            <AbsoluteFill style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '0 80px 150px 80px',
            }}>
                <div style={{
                    transform: `translateY(${interpolate(spr, [0, 1], [50, 0])}px)`,
                    opacity: spr,
                }}>
                    <div style={{
                        fontSize: 28,
                        fontWeight: '300',
                        letterSpacing: '15px',
                        color: 'rgba(255,255,255,0.7)',
                        textTransform: 'uppercase',
                        marginBottom: 10,
                    }}>
                        {scene.subtitle}
                    </div>
                    <div style={{
                        fontSize: 110,
                        fontWeight: '900',
                        color: 'white',
                        lineHeight: 1,
                        letterSpacing: '-2px',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    }}>
                        {scene.title}
                    </div>
                </div>
            </AbsoluteFill>

            {/* Corner Decorative Element */}
            <div style={{
                position: 'absolute',
                top: 80,
                right: 80,
                width: 120,
                height: 120,
                borderTop: '1px solid rgba(255,255,255,0.4)',
                borderRight: '1px solid rgba(255,255,255,0.4)',
                opacity: spr,
            }} />
        </AbsoluteFill>
    );
};

export const RealEstateVideo: React.FC = () => {
    const { fps } = useVideoConfig();

    return (
        <AbsoluteFill style={{ backgroundColor: '#000' }}>
            <Audio src={staticFile('marriott_bgm.mp3')} volume={0.1} loop />

            <Series>
                {assets.map((scene, i) => (
                    <Series.Sequence key={i} durationInFrames={Math.round(scene.duration * fps)}>
                        <Audio src={scene.audio} />
                        <PremiumScene scene={scene} index={i} />
                    </Series.Sequence>
                ))}
            </Series>

            {/* Global HUD Layer */}
            <div style={{
                position: 'absolute',
                top: 80,
                left: 80,
                zIndex: 100,
            }}>
                <div style={{
                    fontSize: 20,
                    fontWeight: '800',
                    color: 'white',
                    letterSpacing: '2px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '8px 20px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}>
                    ESTATE // LUXE
                </div>
            </div>
        </AbsoluteFill>
    );
};
