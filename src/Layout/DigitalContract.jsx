import React, {useState,useContext} from 'react'
import {FaCheck,FaTimes,FaQuestion, FaMinus} from 'react-icons/fa'
import UserService from '../services/user.service'
import AppContext from '../context'
import styles, {dominantColor, secondaryColor} from './stylesheet'

const Crumb = ({title,start,current,complete,currentStep,crumbs,step}) => {
    const {screenSize} = useContext(AppContext)
    return(
        <div style={{
            height: 80,
            width: 200,
            marginLeft: screenSize.device === 'desktop' ? null : -140
            }}>
            
        <div style={{
            position: 'relative',
            color: currentStep === crumbs.length ? 'white' : complete ? 'darkgrey' : current ? secondaryColor : 'grey',
            left: 10,
            top: 54,
            fontWeight: 600,
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        }}>
            <div className={current ? "glitch" : ''} data-text={title} >{title}</div>
            </div>

        <div style={{
            position: 'relative',
            background: currentStep === crumbs.length ? 'green' : complete ? secondaryColor : 'lightgrey',
            borderRadius: '100%',
            height: 25,
            width: 25,
            top: 30,
            left: 148,
            border: `2px solid ${currentStep === crumbs.length ? 'green' : complete ? secondaryColor : current ? 'lightblue' : 'lightgrey'}`,
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'
            }} >
        {<FaCheck style={{opacity: complete ? 1 : 0,marginLeft: 5, marginTop: 5, color: 'black',transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'}} />}
        {<FaQuestion style={{opacity: current ? 1 : 0, position: 'relative', left: 4, top: -21, color: current ? 'gray' : 'darkgrey',transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'}} />}
        {<FaMinus style={{opacity: (complete || current) ? 0 : 1, position: 'relative', left: 5, top: -42, color: current ? 'gray' : 'darkgrey',transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)'}} />}
        </div>

        {!start && 
        <div style={{
            position: 'relative',
            background: currentStep === crumbs.length ? secondaryColor : current || complete ? '#90d4ed' : 'lightgrey',
            borderRadius: 0,
            height: 51,
            width: 5,
            top: -50,
            left: 160,
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        }}
        />}

        {!start && 
        <div style={{
            position: 'relative',
            background: currentStep === crumbs.length ? 'green' : secondaryColor,
            borderRadius: 0,
            height: currentStep >= step ? 51 : 0,
            width: 5,
            top: -101,
            left: 160,
            zIndex: 12,
            transition: 'all 0.66s cubic-bezier(0.685, 0.0473, 0.346, 1)',
        }}
        />}

        </div>
    )
}

const DigitalContract = (props) => {
    const {showInterested,contractContent} = props
    const {currentUser,screenSize} = useContext(AppContext)
    const [mouseDownBack,setMouseDownBack] = useState(false)
    const [mouseDownForward,setMouseDownForward] = useState(false)

    //auth stuff
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState('')
    const handleRegister = (e) => {
        e.preventDefault() 
        setMessage('')
        setSuccessful(false)
        
          UserService.initiateContract(
            contractContent._id,
            'pending',
            currentUser.id,
            ).then(
            (response) => {
              setMessage(response.data.message)
              setSuccessful(true)
            },
            (error) => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
    
              setMessage(resMessage)
              setSuccessful(false)
            }
          )
      }

    const handleClickBack = () => {
        setMouseDownBack(!mouseDownBack)
    }
    const handleClickForward = () => {
        setMouseDownForward(!mouseDownForward)
    }
    const [currentStep, setCurrentStep] = useState(0)
    const crumbs = [
        {
            name: 'Start',
            start: true,
            content: JSON.stringify(contractContent)},
        {name: '1. Test', start: false, content: JSON.stringify(contractContent)},
        {name: '2. Next', start: false, content: 'More'},
        {name: '3. Nexter', start: false, content: 'Hello'},
        {name: '4. Nextest', start: false, content: 'Nothing'},
        {name: '5. Complete', start: false, content: 'Blank' + currentStep},
    ]
    
    return(
        <>
        {screenSize.device === 'desktop' && <div
            onClick={()=> showInterested(false)}
            style={{
                position: 'fixed',
                background: 'black',
                opacity: 0.9,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10
            }}
            />}
        
        
        
        <div style={{
            position: 'fixed',
            top: screenSize.device !== 'desktop' ? 0 : 150,
            left: screenSize.device !== 'desktop' ? 0 : '10%',
            width: screenSize.device !== 'desktop' ? '100%' : '80%',
            zIndex: 10
            }}>
            <div style={{
                borderRadius: 3,
                height: screenSize.device !== 'desktop' ? window.innerHeight : 550,
                width: '100%',
                paddingTop: 0,
                paddingLeft: 10,
                marginTop: screenSize.device !== 'desktop' ? 0 : 20,
                background: dominantColor,
                zIndex: 10
                }} >
            <div
                onClick={() => showInterested(false)}
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: screenSize.device !== 'desktop' ? 5 : 25,
                    right: 5,
                    color: 'white',
                    fontSize: 22
                }}><FaTimes /></div>
            {crumbs.map((item,key) => {
                return(
                    <Crumb
                        key={key}
                        start={item.start}
                        title={item.name}
                        current={currentStep === key}
                        complete={currentStep > key}
                        currentStep={currentStep}
                        crumbs={crumbs}
                        step={key}
                    />
                )
            })}

            </div>

            <div style={{
                position: 'relative',
                paddingLeft: 10,
                paddingTop: 10,
                borderRadius: 3,
                top: screenSize.device === 'desktop' ? -500 : -770,
                left: screenSize.device === 'desktop' ? 240 : 65,
                width: screenSize.device === 'desktop' ? '80%' : '75%',
                height: screenSize.device === 'desktop' ? 420 : 600,
                background: currentStep===6 ? dominantColor : 'white',
                transition: 'all 0.36s cubic-bezier(0.685, 0.0473, 0.346, 1)',
                zIndex: 11
                }} >
                {crumbs[currentStep] === undefined ? '' : crumbs[currentStep]['content']}
            </div>

            <svg className="progress-icon" width="160" height="160" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<g className="tick-icon" strokeWidth="2" stroke="#5dbd6c" fill="none" transform="translate(1, 1.2)">
							<path id="tick-outline-path" d="M14 28c7.732 0 14-6.268 14-14S21.732 0 14 0 0 6.268 0 14s6.268 14 14 14z" opacity="0" />
							<path id="tick-path" d="M6.173 16.252l5.722 4.228 9.22-12.69" opacity="0"/>
						</g>
					</svg>

            <div style={{position: 'absolute', top: screenSize.device === 'desktop' ? 530 : 680, right: 30, zIndex: 12 }}>
            <button style={{
                marginRight: 5,
                border: '0.5px solid grey',
                borderRadius: 5,
                background: mouseDownBack ? 'grey' : 'lightgrey',
                color: currentStep===0 ? 'grey' : 'black',
                padding: 5,
                fontWeight: 600,
                width: 60,
                outline: 'none'
                }}
                disabled={currentStep===0}
                onMouseDown={handleClickBack}
                onMouseUp={handleClickBack}
                onClick={() => setCurrentStep(currentStep < 1 ? currentStep : currentStep-1)}>
                    Back
            </button>

            <button style={{
                border: '0.5px solid grey',
                borderRadius: 5,
                background: mouseDownForward ? 'grey' : 'lightgrey',
                color: currentStep===7 ? 'grey' : 'black',
                padding: 5,
                fontWeight: 600,
                width: 60,
                outline: 'none'
                }}
                onMouseDown={handleClickForward}
                onMouseUp={handleClickForward}
                onClick={currentStep===6 ? () => showInterested(false) : () => setCurrentStep(currentStep === crumbs.length ? currentStep : currentStep+1)}>
                    {currentStep===6 ? 'Close' : currentStep===5 ? 'Finish' : 'Next'}
            </button>
            <button onClick={handleRegister}>Submit test {message} {successful}</button>

            {currentStep===6 &&
                <div style={{opactiy: currentStep===6 ? 1 : 0, position: 'absolute', width: 800, left: -400, top: -350}}>
                    <FaCheck style={{fontSize: '150', color: 'white', transition: 'all 1.33s cubic-bezier(0.685, 0.0473, 0.346, 1)',}} />
                    <div style={{position: 'absolute', textAlign: 'center', top: 170, marginLeft: -260, fontSize: 20, color: 'white'}}>
                        Your contract has been generated and will be submitted to xzy for approval.
                        <br />We will notify you once we have an agreement.
                        </div>
                </div>
            
            }

            </div>

        </div>
        </>
    )
}

export default DigitalContract