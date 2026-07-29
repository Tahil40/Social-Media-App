import React from "react";
import { useRouter } from "next/router";  
import styles from "@/styles/Home.module.css";
import UserLayout from "@/layouts/userLayout";

export default function HomeComponent(){
    const router = useRouter(); 

    return(
        <UserLayout>
        <div className={styles.container}>
            <div className={styles.mainContainer}>
                <div className={styles.mainContainer_left}>
                    <p>Connect with Friends without Exaggeration</p>
                    <p>A True Social media platform, with stories no blufs!</p>
                    <div className={styles.joinButton} onClick={()=> {router.push("/login")}}>
                        <p>Join Now</p>
                    </div>
                </div>
                <div className={styles.mainContainer_right}>
                    <img src="/images/home.jpg" alt="loading..." />
                </div>
            </div>
        </div>
        </UserLayout>
    );
};