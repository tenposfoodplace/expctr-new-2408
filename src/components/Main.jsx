import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Image as ImageImpl, Scroll, ScrollControls, useCursor, useProgress, useScroll } from "@react-three/drei";


function Image({ c = new THREE.Color(), ...props }) {

    const ref = useRef();
    const [hovered, hover] = useState(false);

    useCursor(hovered);

    useFrame(() => {
        ref.current.material.color.lerp(c.set(hovered ? 'white' : '#ccc'), hovered ? 0.01 : 0.01);
    })



    return <ImageImpl ref={ref} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} {...props}
        onClick={() => {
            props.link === '/about' ? window.open(props.link, "_self") : window.open(props.link, "_blank");
        }} />
}

function Images() {
    const { width, height } = useThree((state) => state.viewport);
    const data = useScroll();
    const group = useRef();
    const isMobile = window.innerWidth < 768;
    useFrame(() => {
        group.current.children[0].material.zoom = 1 + (0.5 - data.range(1, 1 / 3)) / 3;
        group.current.children[1].material.zoom = 1 - data.range(1.15 / 3, 1 / 3) / 3;
        group.current.children[2].material.zoom = 1 - data.range(1.15 / 3, 1 / 3) / 3;
        group.current.children[3].material.zoom = 1.1 - data.range(1.15 / 3, 1 / 3) / 3;
        group.current.children[4].material.zoom = 1 - data.range(1.15 / 3, 1 / 3) / 3;
        group.current.children[5].material.zoom = 1 - data.range(1.15 / 3, 1 / 3) / 3;
    })
    return (
        <group ref={group}>
            <Image position={[isMobile ? -1.4 : -2, 0, 0]} scale={[isMobile ? 3.5 : 4, isMobile ? height / 1.3 : height, 1]} url="/img/headshot.png" link={'/about'} />
            <Image position={[isMobile ? 0.1 : 1, -height / 4, isMobile ? 3.3 : 3]} scale={isMobile ? 1.2 : 1.4} url="/img/undress-cover.png" link={'https://friendship.lnk.to/undress'} />
            <Image position={[isMobile ? 0.1 : 1.3, -height / 1.5, isMobile ? 3.3 : 2.8]} scale={isMobile ? 1.4 : 1.8} url="/img/d3-cover.png" link={'https://friendship.lnk.to/DISPLAY_THREE'} />
            <Image position={[isMobile ? -0.1 : -1.5, isMobile ? -height / 1.1 : -height / 1.2, isMobile ? 3.3 : 2.6]} scale={isMobile ? 1.2 : 1.4} url="/img/d2-cover.jpg" link={'https://friendship.lnk.to/DISPLAY_TWO'} />
            <Image position={[isMobile ? 0.1 : 0.8, isMobile ? -height / 0.9 : -height / 1, isMobile ? 3.3 : 2.8]} scale={1.4} url="/img/d1-cover.png" link={'https://open.spotify.com/intl-ja/album/5sE4GGk3lYdOq8U4VIT9Os?si=3WcwSDRbQXau9cNhLbP_Zg'} />
            <Image position={[isMobile ? -0.1 : -1, isMobile ? -height / 0.75 : -height / 0.9, isMobile ? 3 : 3]} scale={isMobile ? 1.3 : 1.4} url="/img/bb-cover.jpg" link={'https://open.spotify.com/intl-ja/album/3f4pAZZTsBehwuYrAO6G9g?si=Ff0ZTsVfQmeYpRvw_wKVlg'} />
        </group>
    )
}

const Loader = () => {
    return (
        <div className="loading">
            <img src="/img/logo.png" alt="" />
        </div>
    )
}

export default function Main() {
    const isMobile = window.innerWidth < 768;
    return (
        <div id="root">
            <Canvas gl={{ antialias: true }} dpr={[1.1, 5]}>

                <ScrollControls damping={1.5} pages={isMobile ? 2.5 : 2}>
                    <Scroll>
                        <Images />

                    </Scroll>
                    <Scroll html>
                        <p className="txt bold" style={{ position: 'absolute', top: isMobile ? '20vh' : '15vh', left: isMobile ? '8em' : '30em' }}>
                            EXPCTR
                        </p>
                        <p className="txt" style={{ position: 'absolute', top: isMobile ? '32vh' : '30vh', left: isMobile ? '8.1em' : '32em' }}>
                            new realese "Undress" out now.
                        </p>
                        <h2 style={{ position: 'absolute', top: isMobile ? '100vh' : '100vh', left: isMobile ? '0.3em' : '1em' }}>works: </h2>
                    </Scroll>

                </ScrollControls>

            </Canvas>
        </div >
    )
}