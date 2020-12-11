import React, {useState} from 'react'
import GridItem from './../Grid/GridItem'
import {FaFacebookSquare,FaTwitterSquare,FaInstagram,FaLinkedin,FaYoutube} from 'react-icons/fa'
import styles, {dominantColor,secondaryColor} from '../stylesheet'

const Link = ({title}) => {
    const [mouseOver,setMouseOver] = useState(false)
    return(
        <div style={{paddingBottom: 10}}>
            <div
                onMouseOver={() => setMouseOver(true)}
                onMouseLeave={() => setMouseOver(false)}
                style={{
                    textDecoration: mouseOver ? 'underline' : 'none',
                    cursor: 'pointer'
                }}
            >
                {title}
            </div>
        </div>
    )
}

const IconColor = ({children, color='white'}) => {
    const [hover,setHover] = useState(false)
    return(
    <div 
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
            ...styles.socialMediaIcons,
            color: hover ? color : 'white',
            transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
    }}>
        {children === undefined
            ? <FaFacebookSquare />
            : children
        }
    </div>
    )
}

const Footer = () => {
    const [emailFocus,setEmailFocus] = useState(false)
    return(
        <> 
            <div style={styles.container}>
                <GridItem>
                <h4>Company</h4>
                    <Link title='About Disrupters' path='/' />
                    <Link title='Ethics' path='/' />
                    <Link title='Diversity' path='/' />
                    <Link title='Enviroment' path='/' />
                </GridItem>
                <GridItem>
                <h4>Legal</h4>
                    <Link title='All Legal Documents' path='/' />    
                    <Link title='Privacy Notice' path='/' />   
                    <Link title='Manage Cookies' path='/' />   
                </GridItem>
                <GridItem>
                <h4>Customer Support</h4>
                    <Link title='Help Centre' path='/' />
                    <Link title='Security' path='/' />
                    <Link title='Server Status' path='/' />
                    <Link title='Get In Touch!' path='/' />
                </GridItem>
                <GridItem>
                <h4>More</h4>
                    <Link title='Responsible Disclosure' path='/' />
                    <Link title='Website accessibility' path='/' />
                </GridItem>
                <GridItem />
                <GridItem>
                <h4>Social Media</h4>
                    <div style={styles.socialMediaContainer} >
                        <IconColor color='#3b5998'><FaFacebookSquare /></IconColor>
                        <IconColor color='#1da1f2' ><FaTwitterSquare /></IconColor>
                        <IconColor color='#bc2a8d'><FaInstagram /></IconColor>
                        <IconColor color='#0072b1'><FaLinkedin /></IconColor>
                        <IconColor color='#C4302B' ><FaYoutube /></IconColor>
                    </div>
                </GridItem>

                <GridItem>
                    <h4>Subscribe to Updates</h4>
                    <div>
                        <input
                            disabled
                            type="text"
                            placeholder="email"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            style={{...styles.subscribeInput, border: emailFocus ? `1px solid ${secondaryColor}` : `1px solid ${dominantColor}`}} />
                            <button disabled style={styles.subscribeButton}>Subscribe</button>
                    </div>
                    <div style={{paddingTop: 10, fontSize: 12}}><input type="checkbox" /> I agree blah blah blah.</div>
                </GridItem>

            </div>
            <div style={styles.copyrightContainer}>
                <div style={styles.copyrightText}>
                    Company registration no: 13036055 | Copyright 2020. All Rights Reserved
                </div>
            </div>
        </>
    )
}

export default Footer
