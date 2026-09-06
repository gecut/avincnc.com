"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type LightRaysProps = {
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  mouseInfluence?: number;
  className?: string;
};

const vertexShader = `
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float iTime;
  uniform vec2 iResolution;
  uniform vec2 rayPos;
  uniform vec2 mousePos;
  uniform vec3 raysColor;
  uniform float raysSpeed;
  uniform float lightSpread;
  uniform float mouseInfluence;

  varying vec2 vUv;

  float rayStrength(
    vec2 source,
    vec2 direction,
    vec2 coordinate,
    float seedA,
    float seedB,
    float speed
  ) {
    vec2 sourceToCoordinate = coordinate - source;
    vec2 normalizedDirection = normalize(sourceToCoordinate);
    float angle = max(dot(normalizedDirection, direction), 0.0);
    float spread = pow(angle, 1.0 / max(lightSpread, 0.001));
    float distanceToSource = length(sourceToCoordinate);
    float maximumDistance = iResolution.x * 1.8;
    float falloff = clamp((maximumDistance - distanceToSource) / maximumDistance, 0.0, 1.0);
    float movement = clamp(
      (0.45 + 0.15 * sin(angle * seedA + iTime * speed)) +
      (0.3 + 0.2 * cos(-angle * seedB + iTime * speed)),
      0.0,
      1.0
    );

    return movement * falloff * spread;
  }

  void main() {
    vec2 coordinate = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);
    vec2 baseDirection = vec2(0.0, 1.0);
    vec2 mouseDirection = normalize(mousePos * iResolution - rayPos);
    vec2 direction = normalize(mix(baseDirection, mouseDirection, mouseInfluence));

    float firstRay = rayStrength(rayPos, direction, coordinate, 36.2214, 21.11349, 1.5 * raysSpeed);
    float secondRay = rayStrength(rayPos, direction, coordinate, 22.3991, 18.0234, 1.1 * raysSpeed);
    float strength = min(1.0, firstRay * 0.5 + secondRay * 0.4);
    float verticalBrightness = 1.0 - coordinate.y / iResolution.y;
    vec3 color = raysColor * strength;

    color.r *= 0.1 + verticalBrightness * 0.8;
    color.g *= 0.3 + verticalBrightness * 0.6;
    color.b *= 0.5 + verticalBrightness * 0.5;

    gl_FragColor = vec4(color, strength);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  if (!match) return [1, 1, 1];

  return [
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ];
}

export function LightRays({
  raysColor = "#60a5fa",
  raysSpeed = 0.3,
  lightSpread = 2,
  mouseInfluence = 0.4,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
    });
    const gl = renderer.gl;
    const mouse = { current: [0.5, 0.5] as [number, number] };
    const smoothMouse = [0.5, 0.5] as [number, number];
    let animationFrame = 0;
    let visible = true;

    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    container.appendChild(gl.canvas);

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: [1, 1] as [number, number] },
      rayPos: { value: [0, 0] as [number, number] },
      mousePos: { value: [0.5, 0.5] as [number, number] },
      raysColor: { value: hexToRgb(raysColor) },
      raysSpeed: { value: raysSpeed },
      lightSpread: { value: lightSpread },
      mouseInfluence: { value: mouseInfluence },
    };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value = [width * renderer.dpr, height * renderer.dpr];
      uniforms.rayPos.value = [width * renderer.dpr * 0.5, -height * renderer.dpr * 0.2];
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect();
      mouse.current = [
        (event.clientX - bounds.left) / bounds.width,
        (event.clientY - bounds.top) / bounds.height,
      ];
    };

    const render = (time: number) => {
      if (!visible) return;

      smoothMouse[0] += (mouse.current[0] - smoothMouse[0]) * 0.08;
      smoothMouse[1] += (mouse.current[1] - smoothMouse[1]) * 0.08;
      uniforms.mousePos.value = smoothMouse;
      uniforms.iTime.value = reducedMotion ? 0 : time * 0.001;
      renderer.render({ scene: mesh });

      if (!reducedMotion) animationFrame = window.requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reducedMotion && !animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
      if (!visible && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });

    resize();
    render(0);
    observer.observe(container);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [lightSpread, mouseInfluence, raysColor, raysSpeed]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none relative size-full overflow-hidden ${className}`}
    />
  );
}
