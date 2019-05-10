import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
const BASE_URL = 'http://localhost:3000/';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
 
class App extends Component {
    
constructor(props) {
super(props);
this.state = {
images: [],
imageUrls: [],
message: ''
}

}

selectImages = (event) => {
let images = []
for (var i = 1; i < event.target.files.length; i++) {
images[i] = event.target.files.item(i);
}
images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
let message = `${images.length} valid image(s) selected`
this.setState({ images, message })
}
 
uploadImages = () => {
const uploaders = this.state.images.map(image => {
const data = new FormData();
data.append("image", image, image.name);
 
// Make an AJAX upload request using Axios
return axios.post(BASE_URL + 'upload', data)
.then(response => {
this.setState({
imageUrls: [ response.data.imageUrl, ...this.state.imageUrls ]
});
})
});
 
// Once all the files are uploaded 
axios.all(uploaders).then(() => {
console.log('done');
}).catch(err => alert(err.message));
}
 
render() {
return (
<div>
<h1>Image Uploader</h1>

<input className="form-control " type="file" 
onChange={this.selectImages} multiple/>

<p className="text-info">{this.state.message}</p>
<br/><br/><br/>

<Button style={{backgroundColor:'#1976D2'}} value="Submit" 
onClick={this.uploadImages}>Submit</Button>



{ 
this.state.imageUrls.map((url, i) => (
<div className="col-lg-2" key={i}>
<img src={BASE_URL + url} className="img-rounded img-responsive"
alt="not available"/><br/>
</div>
))
}
</div>
);
}
}
export default App;