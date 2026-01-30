import { Composition } from 'remotion';
import { NewsVideo } from './NewsVideo';
import { LondonVideo } from './LondonVideo';
import { ManifestVideo } from './ManifestVideo';
import { CodingVideo } from './CodingVideo';
import { Cinematic3DVideo } from './Cinematic3DVideo';
import { RealEstateVideo } from './RealEstateVideo';
import { MalamaManifest } from './MalamaManifest';
import { SBNRVideo } from './SBNRVideo';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <Composition
                id="NewsVideo"
                component={NewsVideo}
                durationInFrames={1620}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="LondonVideo"
                component={LondonVideo}
                durationInFrames={1140}
                fps={30}
                width={1920}
                height={1080}
            />
            <Composition
                id="ManifestVideo"
                component={ManifestVideo}
                durationInFrames={960}
                fps={30}
                width={1080}
                height={1920}
            />
            <Composition
                id="CodingVideo"
                component={CodingVideo}
                durationInFrames={300}
                fps={30}
                width={1080}
                height={1080}
            />
            <Composition
                id="Cinematic3DVideo"
                component={Cinematic3DVideo}
                durationInFrames={450}
                fps={30}
                width={1080}
                height={1350}
            />
            <Composition
                id="RealEstateVideo"
                component={RealEstateVideo}
                durationInFrames={825}
                fps={30}
                width={1080}
                height={1920}
            />
            <Composition
                id="MalamaManifest"
                component={MalamaManifest}
                durationInFrames={1260} // 42 seconds
                fps={30}
                width={1080}
                height={1920}
            />
            <Composition
                id="SBNRVideo"
                component={SBNRVideo}
                durationInFrames={1425}
                fps={30}
                width={1080}
                height={1920}
            />
        </>
    );
};
