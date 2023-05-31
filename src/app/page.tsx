"use client";
import styles from './page.module.css'
import {SigmoidBoard} from "../components/SigmoidBoard";
import React from "react";


export default function Home() {
  return (
    <main className={styles.main}>
        <h1 className="w-full text-center pb-4">Sigmoid function</h1>
     <SigmoidBoard/>
    </main>
  )
}
