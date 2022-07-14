import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Container, Row, Col} from 'reactstrap';

class MyComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: "",
            showModal: false,
            testMessage: "",
            summary: "",

            currentRow: -6,
            modalDepartment: "Default College Department",
            modalCollege: "Default College Name",
            modalTitle: "",
            modalCourse: 0,
            modalDetails: ""
        }
    }

    updateData = (apiResponse) => {
        this.setState({data: apiResponse})
    }

    setValues = () => {
         fetch('/test_message')
         .then(
             response => response.json() 
             )//The promise response is returned, then we extract the json data
         .then (jsonOutput => //jsonOutput now has result of the data extraction
                  {
                      this.setState({testMessage: jsonOutput})
                    }
        )
    }

    fetchData = () => {
        fetch('/courses', {
            method: "GET",
            headers : { 
                'content-type': 'application/json',
            },
         })
        .then(
             response => { const res = response.json(); return res }
             )
        .then (jsonOutput => {
             this.updateData(jsonOutput);
             return jsonOutput;
        })

    }
    componentDidMount(){
        this.fetchData();
    }
    

    goDelete = (num) => {
        this.deleteCourse(num);
    }
    deleteCourse(num){
        // Example Delete Request
        fetch('courses/' + num, {
            method: 'DELETE',
        })
        this.setState({
            currentRow: num
        })
        this.fetchData()
        window.location.reload()
        this.setState({
            currentRow: num
        })
    }


    editCourse = () => {
        // Example Post request
        const formData = new FormData();
        // formData.append('dept_id', 329);
        formData.append('c_number', this.state.modalCourse);
        formData.append('c_title', this.state.modalTitle);
        formData.append('c_details', this.state.modalDetails);
        
        let idCode = this.state.currentRow;
        fetch('/courses/' + (idCode++), {
            method: "PUT",
            body: formData
        })
        this.setState({ showModal: false })
        this.fetchData()
        window.location.reload()
        this.setState({ showModal: false })
    }


    handleSubmit = (numot) =>{
        // let msg = 
        //     'Your name is ' + this.state.firstName + ' ' + this.state.lastName; //Use the updated state variables to capture the user input
        this.setState({
            // modalTitle: ,
            showModal: true,
            currentRow: numot
        }, () => {
            console.log(this.state.currentRow)
        })
    }

    nameNewCourse = (event) =>{
        this.setState({modalCourse : event.target.value})
    }
    nameNewTitle = (event) => {
        this.setState({modalTitle : event.target.value})
    }
    nameNewDetails = (event) => {
        this.setState({modalDetails : event.target.value})
    }

    BuildRows() {
        var coursesAvailable = this.state.data;
        var array = []
        // console.log("Dict is ", Object.keys(coursesAvailable))

        // var resky = Object.keys(coursesAvailable)
        // console.log("Resky is", resky)
        Object.keys(coursesAvailable).map(x => (
            array.push(
                <Row key={x} className='border' >
                    <Col xs='1' className='border text-center'><Button id={x} onClick={() => { this.handleSubmit(coursesAvailable[x][0]) }}>EDIT</Button></Col>
                    <Col xs='1' className='border text-center'><Button id={coursesAvailable[x][0]} onClick={ () => this.goDelete(coursesAvailable[x][0]) } >DELETE</Button></Col>
                    <Col xs='1' className='border' style={{'backgroundColor': (x%2) === 0 ? 'gray' : 'white'}} >{coursesAvailable[x][0]}</Col>
                    <Col xs='1' className='border' style={{'backgroundColor': (x%2) === 0 ? 'gray' : 'white'}} >{coursesAvailable[x][1]} </Col>
                    <Col xs='2' className='border' style={{'backgroundColor': (x%2) === 0 ? 'gray' : 'white'}} >{coursesAvailable[x][2]} </Col>
                    <Col xs='3' className='border' style={{'backgroundColor': (x%2) === 0 ? 'gray' : 'white'}} >{coursesAvailable[x][3]} </Col>
                    <Col xs='3' className='border' style={{'backgroundColor': (x%2) === 0 ? 'gray' : 'white'}} >{coursesAvailable[x][4]} </Col>
                </Row>
            )
        ));
        
        return array;
    }

    render(){
        return (
            <Container>
                <div>
                    <h1 className='text-center mt-2 mb-3 text-underline'>Classes offered at a prestigious University</h1>
                    
                    <Container>
                        <Row className='border text-center' style={{ 'backgroundColor': 'black','color': "white"}}>
                            <Col className='border m-0 p-0' xs='1'></Col>
                            <Col className='border m-0 p-0' xs='1'></Col>
                            <Col className='border m-0 p-0' xs='1'>ID</Col>
                            <Col className='border m-0 p-0' xs='1'>Dept</Col>
                            <Col className='border m-0 p-0' xs='2'>Class</Col>
                            <Col className='border m-0 p-0' xs='3'>Title</Col>
                            <Col className='border m-0 p-0' xs='3'>Details</Col>
                        </Row>
                        {this.BuildRows()}
                    </Container>
                    
                    <Modal isOpen={this.state.showModal} onOpened={this.setValues}>
                        <ModalHeader>{this.state.modalCollege}</ModalHeader>
                        <ModalHeader>{this.state.modalDepartment}</ModalHeader>
                        <ModalBody>
                            <Container>
                                Course
                                <Row className=''>
                                    <Col>
                                        <input style={{ 'width': "100%" }} onChange={this.nameNewCourse} type="text" name="newNightClub" placeholder={this.state.modalCourse} />
                                    </Col>
                                </Row>

                                Title
                                <Row className=''>
                                    <Col>
                                        <input style={{ 'width': "100%" }} onChange={this.nameNewTitle} type="text" name="newNightClub" placeholder={this.state.modalTitle} />
                                    </Col>
                                </Row>

                                Details
                                <Row className=''>
                                <Col>
                                        <input style={{ 'width': "100%" }} onChange={this.nameNewDetails} type="text" name="newNightClub" placeholder={this.state.modalDetails} />
                                    </Col>
                                </Row>

                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={()=>this.editCourse()}>Save</Button>
                            <Button color="primary" onClick={()=>this.setState({showModal:false})}>Cancel</Button>
                        </ModalFooter>
                    </Modal>

                </div>
            </Container>
        )
    }
}

export default MyComponent;

// When edit button is clicked set state of current Row
// Get thsoe methods from handle change in nightclub to edit the modal description, courses, and names