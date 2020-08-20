import React from 'react';
import styles from './timer.module.scss'
import { faPause, faPlay, faRetweet, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './timer.module.scss'
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brLength : 5,
            sessLength: 25,
            isRun:true,
            sessRun:true,
            breakRun:false,       
            timeleft:60*25,
            timelabel:'Session',
            displayTime:'25:00',
        }
        this.breakInc = this.breakInc.bind(this);
        this.breakDec = this.breakDec.bind(this);
        this.sessInc = this.sessInc.bind(this);
        this.sessDec = this.sessDec.bind(this);
        this.timer = this.timer.bind(this);
        this.startTimer = this.startTimer.bind(this);

        this.resetTimer = this.resetTimer.bind(this);
        this.play = this.play.bind(this);
        

      }

      componentDidMount() {  
    
    }
    

    play(){
       document.getElementById('beep').play()
       
    }
  
    timer(){ 
       let timeleft = this.state.timeleft-1
       let min = Math.floor(timeleft/60)
       let sec = Math.floor(timeleft-min*60)   
        min = `${min}`.length<2? `0${min}`:`${min}`
        sec = `${sec}`.length<2? `0${sec}`:`${sec}`
        let displayTime = min+':'+sec
        this.setState({...this.state,timeleft,displayTime})
        if(this.state.timeleft===0) this.play()
         if(this.state.timeleft<0){
           
           let timelabel = this.state.timelabel==='Session'? 'Break': 'Session'
           let timeleft = this.state.timelabel==='Session'? this.state.brLength*60:this.state.sessLength*60
           let displayTime = `0${timeleft/60}:00`
           this.setState({...this.state,timelabel,timeleft,displayTime,sessRun:!this.state.sessRun, breakRun:!this.state.breakRun})
       }
    }

    startTimer(){
       if(!this.state.isRun) clearInterval(this.interval)
        this.setState({...this.state,isRun:!this.state.isRun})
        if(this.state.isRun){
        this.interval =  setInterval( this.timer,1000)
        }  
    }
    resetTimer(){
        if (document.getElementById('beep')) {
            document.getElementById('beep').pause();
            document.getElementById('beep').currentTime = 0

        }
        this.setState(
            {
                brLength : 5,
                sessLength: 25,
                isRun:true,
                sessRun:true,
                breakRun:false,       
                timeleft:25*60,
                timelabel:'Session',
                displayTime:'25:00',
            })
            clearInterval(this.interval)
    }
    
      breakInc() {
        if(this.state.isRun){  
            if(this.state.brLength <60 ) { 
                let brLength = this.state.brLength+1
                let displayTime = this.state.breakRun? `${brLength}:00`:`${this.state.sessLength}:00`
                let timeleft =  this.state.breakRun? brLength*60:(this.state.sessLength)*60
                this.setState({...this.state, brLength ,displayTime,timeleft})

            }
         
        }
      }
      breakDec() {
        if(this.state.isRun){  
            let brLength = this.state.brLength-1
            if(brLength > 0 ) { 
                let displayTime = this.state.breakRun? `${brLength}:00`:`${this.state.sessLength}:00`
                let timeleft =  this.state.breakRun? brLength*60:(this.state.sessLength)*60
                console.log('breakRun displaytime',displayTime, 'timeleft', timeleft)
                this.setState({...this.state, brLength ,displayTime,timeleft})
            }          
        }
      }
      sessInc() {
        if(this.state.isRun){  
            if(this.state.sessLength <60 ) { 
                let sessLength = this.state.sessLength+1
                let displayTime = this.state.sessRun? `${sessLength}:00`:`${this.state.brLength}:00`
                let timeleft =  this.state.sessRun? sessLength*60:(this.state.brLength)*60
                console.log(displayTime)
                this.setState({...this.state, sessLength ,displayTime,timeleft})
            }   
        }
      }
      sessDec() {
        if(this.state.isRun){  
            let sessLength = this.state.sessLength-1
            if(sessLength > 0){
                let displayTime = this.state.sessRun? `${sessLength}:00`:`${this.state.brLength}:00`
               let timeleft =  this.state.sessRun? sessLength*60:(this.state.brLength)*60
               this.setState({...this.state, sessLength ,displayTime,timeleft})
            }           
        }
      }

    render(){
        return (
            <div id={styles.wrapper}>
            <div id={styles.container}>
                <div id={styles.clockHeader}>
                    <h2> Pomodoro Clock</h2>
                    <div id={styles.break}>       
                        <p  id="break-label">Break Length</p>
                        <div id={styles.breakBody} >
                            <button id="break-decrement" onClick = {this.breakDec}>
                                <FontAwesomeIcon icon={faArrowDown} size="4x" className={styles.reset}/>   
                            </button>
                            <p id="break-length">{this.state.brLength}</p>
                            <button id="break-increment" onClick = {this.breakInc}>
                            <FontAwesomeIcon icon={faArrowUp} size="4x" className={styles.reset}/>
                            </button>
                        </div>
                   </div>
                   <div id={styles.session}>
                     <p id="session-label"> Session Length </p>
                    <div id={styles.sessBody}>
                        <button id="session-decrement" onClick = {this.sessDec} >
                            <FontAwesomeIcon icon={faArrowDown} size="4x" className={styles.reset}/> 
                        </button>
                        <p id="session-length">{this.state.sessLength}</p>
                        <button id="session-increment" onClick = {this.sessInc}>
                            <FontAwesomeIcon icon={faArrowUp} size="4x" className={styles.reset}/> 
                        </button>
                    </div>
                   </div>
                </div>                       
                <div id={styles.clockBody}>
                    <p id="timer-label">{this.state.timelabel}</p>
                    <time id="time-left">{this.state.displayTime}</time>            
                </div>  
                <div id= {styles["clock-play"]}>
                    <button id="start_stop" onClick = {this.startTimer} >
                        <FontAwesomeIcon icon={faPlay} size="4x" className={styles.play}/>
                        <FontAwesomeIcon icon={faPause} size="4x" className={styles.pause}/> 
                    </button>
                    <button  id='reset' onClick = {this.resetTimer}>
                        <FontAwesomeIcon icon={faRetweet} size="4x" className={styles.reset}/>
                    </button>          
                   <audio controls style={{display:"none"}} id = "beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" > </audio>
                </div>
            </div>
        </div>
        )
    }
}
export default Timer