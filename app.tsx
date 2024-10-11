import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

function SpiceModel({ position, rotation }) {
  const { scene } = useGLTF('/assets/3d/duck.glb') // Replace with actual spice model
  return <primitive object={scene} position={position} rotation={rotation} />
}

function Background() {
  const { scene } = useThree()
  const bgRef = useRef()

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load('/assets/3d/texture_earth.jpg') // Replace with a spice-themed texture
    const geometry = new THREE.SphereGeometry(500, 60, 40)
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
    const mesh = new THREE.Mesh(geometry, material)
    bgRef.current = mesh
    scene.add(mesh)

    return () => {
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      texture.dispose()
    }
  }, [scene])

  useFrame(() => {
    if (bgRef.current) {
      bgRef.current.rotation.x += 0.0005
      bgRef.current.rotation.y += 0.0005
    }
  })

  return null
}

function FloatingSpices() {
  const spices = useRef([])

  useEffect(() => {
    spices.current = Array(50).fill().map(() => ({
      position: [Math.random() * 40 - 20, Math.random() * 40 - 20, Math.random() * 40 - 20],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    }))
  }, [])

  useFrame(() => {
    spices.current.forEach((spice, i) => {
      spice.position[1] += Math.sin(Date.now() * 0.001 + i) * 0.01
      spice.rotation[0] += 0.01
      spice.rotation[1] += 0.01
    })
  })

  return (
    <>
      {spices.current.map((spice, i) => (
        <SpiceModel key={i} position={spice.position} rotation={spice.rotation} />
      ))}
    </>
  )
}

function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Background />
      <FloatingSpices />
    </Canvas>
  )
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/placeholder.svg?height=60&width=60" alt="Premium Spices Co. Logo" className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-bold text-white">Premium Spices Co.</h1>
            <p className="text-sm text-gray-300">Bulk Quality Spices for Discerning Businesses</p>
          </div>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#home" className="text-white hover:text-yellow-400 transition-colors">Home</a></li>
            <li><a href="#products" className="text-white hover:text-yellow-400 transition-colors">Our Spices</a></li>
            <li><a href="#about" className="text-white hover:text-yellow-400 transition-colors">About Us</a></li>
            <li><a href="#contact" className="text-white hover:text-yellow-400 transition-colors">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

function ProductShowcase() {
  const [activeProduct, setActiveProduct] = useState(0)
  const products = [
    { name: 'Premium Cinnamon', description: 'Rich, aromatic cinnamon perfect for bakeries and restaurants.' },
    { name: 'Gourmet Black Pepper', description: 'Intensely flavored black pepper for discerning chefs.' },
    { name: 'Saffron Gold', description: 'The finest saffron threads for luxurious culinary creations.' },
    { name: 'Artisanal Herb Blend', description: 'A proprietary blend of premium herbs for versatile use.' },
  ]

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Our Premium Spices</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <SpiceModel position={[0, 0, 0]} rotation={[0, Math.PI * 2 * (activeProduct / products.length), 0]} />
            </Canvas>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  activeProduct === index ? 'bg-yellow-400 text-black' : 'bg-gray-800 text-white'
                }`}
                onClick={() => setActiveProduct(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p>{product.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ParallaxSection({ children, offset = 50 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      <Header />
      <main className="relative z-10">
        <ParallaxSection>
          <section id="home" className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-6xl font-bold mb-4">Elevate Your Culinary Creations</h2>
              <p className="text-xl mb-8">Premium spices in bulk for discerning businesses</p>
              <Button className="bg-yellow-400 text-black hover:bg-yellow-500">Explore Our Spices</Button>
            </div>
          </section>
        </ParallaxSection>

        <ProductShowcase />

        <ParallaxSection offset={100}>
          <section id="about" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">About Us</h2>
              <p className="text-lg text-center max-w-3xl mx-auto">
                Premium Spices Co. has been a trusted supplier of bulk, high-quality spices for over two decades. 
                We work directly with spice farms to ensure the highest quality and freshest products for our clients. 
                Our commitment to excellence has made us the go-to source for restaurants, food manufacturers, and gourmet retailers worldwide.
              </p>
            </div>
          </section>
        </ParallaxSection>

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Contact Us</h2>
            <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your bulk spice needs" />
                </div>
                <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Premium Spices Co. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}