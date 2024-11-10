import Particles, { initParticlesEngine } from "@tsparticles/react";
import React, { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { Container } from "@mui/material";

const ParticlesFooter = () => {

    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            //await loadAll(engine);
            //await loadFull(engine);
            await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            background: {
                opacity: 1,
            },
            fullScreen: { enable: false, zIndex: 0 },
            fpsLimit: 120,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    push: {
                        quantity: 2,
                    },
                    repulse: {
                        distance: 0,
                        duration: 0,
                    },
                    bounce: {
                        enable: true,
                    },
                },
            },
            particles: {
                color: {
                    value: "#000000",
                },
                links: {
                    color: "#000000",
                    distance: 150,
                    enable: false,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: "top",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: false,
                    speed: 0.5,
                    straight: false,
                },
                number: {
                    density: {
                        enable: false,
                    },
                    value: 100,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 5 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

    return (
        <React.Fragment>
            <Container
                maxWidth="false"
                disableGutters
                sx={ { position: 'fixed', bottom: 0, height: "200" } }>
                <Particles
                    id="tsparticles"
                    options={ options }
                    particlesLoaded={ particlesLoaded }
                />
            </Container>
        </React.Fragment>
    )
}

export default ParticlesFooter;
