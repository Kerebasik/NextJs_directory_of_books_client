import styles from '@/styles/Home.module.scss'


const HomePage = ()=>{
    return(
       <div className={styles.home}>
           <div className={styles.title}>
               <h1>GLOBAL DIGITAL LIBRARY</h1>
               <p>A hub of knowledge for transformation.</p>
           </div>
           <div className={styles.text}>
                <h3>Browse our Collections</h3>
                <p>Each Collection of our Global Digital Library represents a domain of human development wisdom that influences or is influenced by coaching. Connecting these fields of inquiry is our commitment to investigate how coaching contributes to the United Nations Action Plan for societal well-being. As a holistic system, these four pillars inform our research focus, which in turn generates our body of knowledge.</p>
           </div>
       </div>
    )
}

export default HomePage