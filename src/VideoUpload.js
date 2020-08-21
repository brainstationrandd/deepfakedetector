import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import {Button, Container, Row, Col,Navbar, Alert, Card,ListGroup} from 'react-bootstrap';

class VideoUpload extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      get_video: '',
      videoAttribute: [],
      showresult: false,
      showalert: false
    };
    this.inputFileRef = React.createRef();
    this.onBtnClick = this.handleBtnClick.bind(this);
  }
  handleBtnClick() {
    /*Collecting node-element and performing click*/
    this.inputFileRef.current.click();
  }

  chosenVideo(e) {
        
    e.preventDefault();

		var file = e.target.files[0];
    var file_state = e.target;
    
		var reader = new FileReader();
		reader.onload = () => {
			this.setState({
				get_video: reader.result,
				videoAttribute: file_state
            });
           
            var vid = new Audio(reader.result);
            vid.onloadedmetadata = ()=>{
                console.log(vid.duration);
                let minutes = vid.duration/60.0;
                if(minutes>5) {
                  this.setState({showalert: true});
                    // alert('Video Duration must be within 5 min');
                    
                }
                else {
                  this.setState({showresult: true});
                  console.log(this.state.showresult);
                }
       
        };  
        
			console.log(reader.duration);
		};
		reader.readAsDataURL(file);
	}

  render() {

    var isVideoPreview = '';
    var showResult = '';
    var showAlert = '';

    if(this.state.get_video != '') {
      isVideoPreview = (
        <video 
          type="video/swf" 
          src={this.state.get_video} 
          className="get_preview_video_class" 
          controls
        >
		    </video>
      );
      
    }
    if(this.state.showalert===true) {
      
      showAlert= (
      <Alert id="hideInThreeSec" variant="info" onClose={() => this.setState({showalert: false})} delay={3000} autohide>
        {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
        Video duration must be within 5 min
      </Alert>
      )
    }
    if(this.state.showresult === true) {
      showResult = (
      <Card
        bg='info'
        // text='dark'
        // id="hideInFiveSec"
        style={{ width: '20rem' }}
        // className="mb-2"
      >
        <ListGroup>
          <ListGroup.Item>Fake</ListGroup.Item>
          <ListGroup.Item>Probability: 77%</ListGroup.Item>
        </ListGroup>
      </Card>
         
      )
    }

    return (
        <Container >
          <Navbar expand="lg" variant="dark" bg="dark">
            <Container>
              <Navbar.Brand href="/">Deepfake Detector</Navbar.Brand>
            </Container>
          </Navbar>
            <Row className="justify-content-md-center button">
            {/* <Col> */}
                <input 
                    ref={this.inputFileRef}
                    className="hide"
                    type="file" 
                    accept="video/*" 
                    onChange={this.chosenVideo.bind(this)} 
                  />
                <Button onClick={ this.onBtnClick} >Upload Video
                   
                    
               </Button>
               {/* </Col> */}
            </Row>
            <Row className="justify-content-md-center">
                {/* <Col> */}
                
                    {isVideoPreview}
               
                {/* </Col>   */}
            </Row>
            <Row className="justify-content-md-center">
              {showAlert}
            </Row>
            <Row className="justify-content-md-center">
                {/* <Col> */}
                
                    {showResult}
              
                {/* </Col>  */}
               
              
            </Row>
        
        </Container>
    );
  }
}

export default VideoUpload;
