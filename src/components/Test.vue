// https://github.com/MisterMChem/Dogedojo/blob/master/index.html
//https://www.telerik.com/blogs/how-to-emit-data-in-vue-beyond-the-vuejs-documentation

<template>
  <div class="col-lg-6" id="uploadDiv">
    <h2>Your favorite doge:</h2>

    <h2>Upload Doge</h2>
    <label class="myLabel" id="inputLabel">
      <!-- <input type="file" id="upload" @change="handleFileSelect()" /> -->
      <input type="file" @change="onFileChanged" id="upload" />
      <span>Select File</span>
    </label>
    <div class="input-group upload-group">
      <input type="text" placeholder="Image Title" id="imgTitle" />
    </div>
    <div class="input-group upload-group">
      <input type="text" placeholder="Image Caption" id="imgDesc" />
    </div>
    <button type="button" class="btn btn-primary upload-group" @click="confirmUpload()">SUBMIT</button>
  </div>
</template>

<script>
import db from "./firebaseInit";
import firebase from "firebase";
import { debug } from "util";
firebase.auth().currentUser;
export default {
  name: "test",
  data() {
    return {
      selectedFile: null,
      selectedFileName: null,
      user: null,
      personaImageUrl: null
    };
  },
  methods: {
    savePerformer(ImageUrl) {
      db.collection("performers")
        .add({
          performer_id: "0004",
          name: "Test Image Perf",
          dept: "Drag",
          position: "Drag Artist",
          personaImageUrl: ImageUrl
        })
        .then(docRef => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error adding performer: ", error);
        });
    },
    onFileChanged(event) {
      // $(".upload-group").show();

      console.log("==============================");
      this.selectedFile = event.target.files[0];

      console.log(this.selectedFile);
      console.log("==============================");
    },
    confirmUpload() {
      var metadata = {
        contentType: "image",
        customMetadata: {
          uploadedBy: this.user.uid,
          title: $("#imgTitle").val(),
          caption: $("#imgDesc").val()
        }
      };
      var cloudFilePath = `personaImages/${this.user.uid}/${this.selectedFile.name}`;
      var uploadTask = firebase
        .storage()
        .ref()
        .child(cloudFilePath)
        .put(this.selectedFile, metadata);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      var downloadImageUrl = null;

      debugger;

      uploadTask.on(
        "state_changed",
        function(snapshot) {
          // Observe state change events such as progress, pause, and resume
          // See below for more detail
        },
        function(error) {
          // Handle unsuccessful uploads
        },
        function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          $(".upload-group")[0].before("Success!");
          $(".upload-group").hide();

          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            downloadImageUrl = downloadURL;
            // console.log("==============================");
            // console.log("==============================");
            // console.log(downloadURL);
            // console.log("==============================");
            // console.log("==============================");

            db.collection("performers")
              .add({
                performer_id: "0004",
                name: "Test Image Perf",
                dept: "Drag",
                position: "Drag Artist",
                personaImageUrl: downloadImageUrl
              })
              .then(docRef => {
                console.log("Client added: ", docRef.id);
                this.$router.push("/");
              })
              .catch(error => {
                console.error("Error adding performer: ", error);
              });
          });
        }
      );
      console.log("==============================");
      console.log("==============================");
      console.log(finalURL);
    }

    // onUpload() {
    //   //axios.post('my-domain.com/file-upload', this.selectedFile)
    //   const formData = new FormData();
    //   formData.append("myFile", this.selectedFile, this.selectedFile.name);
    //   axios.post("my-domain.com/file-upload", formData);
    // }
  },
  created() {
    this.user = firebase.auth().currentUser;
  }
};
</script>

<style scoped>
</style>