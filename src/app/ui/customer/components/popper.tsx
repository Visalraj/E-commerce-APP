"use client";

import { useEffect } from "react";
import "./styles/popper-styles.css";

const CONFETTI_COUNT = 40;
const ANIMATION_SPEED = 1.5;

export default function Popper() {
    useEffect(() => {
        const container = document.querySelector(".confetti-land");

        if (!container) return;

        document.body.setAttribute("data-type", "bookmarks");

        const confetti = container.querySelectorAll<HTMLElement>(".confetti");
        const players: Animation[] = [];

        confetti.forEach((candycorn, i) => {
            candycorn.innerHTML = '<div class="rotate"><div class="askew"></div></div>';

            const scale = Math.random() * 0.5 + 0.5;
            const startX = (i / confetti.length) * 100;
            const endX = startX + 10;
            const rotation = Math.random() > 0.5 ? 2 : -2;

            const duration = 6500 + Math.random() * 1000;
            const delay = Math.random() * 500;

            const player = candycorn.animate(
                [
                    {
                        transform: `translate3d(${startX}vw, -5vh, 0) scale(${scale}) rotate(0turn)`,
                        opacity: 0,
                    },
                    {
                        transform: `translate3d(${endX}vw, 105vh, 0) scale(${scale}) rotate(${rotation}turn)`,
                        opacity: 1,
                    },
                ],
                {
                    duration: duration / ANIMATION_SPEED,
                    iterations: 1,
                    delay: delay / ANIMATION_SPEED,
                    easing: "ease-in",
                    fill: "forwards",
                },
            );

            players.push(player);
        });

        // Wait until every confetti piece has finished falling.
        Promise.all(players.map((player) => player.finished))
            .then(() => {
                container.classList.add("hide-confetti");
            })
            .catch(() => {
                // Animation may have been cancelled during cleanup.
            });

        return () => {
            players.forEach((player) => player.cancel());
        };
    }, []);

    return (
        <div className="confetti-land" aria-hidden="true">
            {Array.from({ length: CONFETTI_COUNT }).map((_, index) => (
                <div className="confetti" key={index} />
            ))}
        </div>
    );
}
