<template>
  <div id="new-persona">
    <h3>New Persona: {{persona_type}}</h3>
    <div class="row">
      <form @submit.prevent="savePersona" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" class="validate" />
            <label for="icon_prefix">Stage Name</label>
          </div>
          <div class="input-field col s6">
            <i class="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" class="validate" />
            <label for="icon_telephone">Cell Phone</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">email</i>
            <input id="icon_prefix" type="email" class="validate" />
            <label for="icon_prefix">Email</label>
          </div>
          <div class="input-field col s6">
            <div class="file-field input-field">upload</div>
          </div>
        </div>
      </form>
    </div>

    <div>
      <v-btn @click.native="selectFile" v-if="!uploadEnd && !uploading">
        Upload a cover image
        <v-icon right aria-hidden="true">add_a_photo</v-icon>
      </v-btn>
      <form ref="form">
        <input
          id="files"
          type="file"
          name="file"
          ref="uploadInput"
          accept="image/*"
          :multiple="false"
          @change="detectFiles($event)"
        />
      </form>
      <v-progress-circular
        v-if="uploading && !uploadEnd"
        :size="100"
        :width="15"
        :rotate="360"
        :value="progressUpload"
        color="primary"
      >{{ progressUpload }}%</v-progress-circular>
      <img v-if="uploadEnd" :src="downloadURL" width="100%" />
      <div v-if="uploadEnd">
        <v-btn class="ma-0" dark small color="error" @click="deleteImage()">Delete</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "new-persona",
  data() {
    return {
      persona_id: null,
      persona_type: "Genderless",
      name: null,
      progressUpload: 0,
      fileName: "",
      uploadTask: "",
      uploading: false,
      uploadEnd: false,
      downloadURL: ""
    };
  },
  methods: {
    // https://www.youtube.com/watch?v=VqnJwh6E9ak
    // https://gist.github.com/LoveMeWithoutAll/02c3810c3cfc6c0f9447c3697c7431b6
    selectFile() {
      this.$refs.uploadInput.click();
    },

    detectFiles(e) {
      let fileList = e.target.files || e.dataTransfer.files;
      Array.from(Array(fileList.length).keys()).map(x => {
        this.upload(fileList[x]);
      });
    },

    upload(file) {
      this.fileName = file.name;
      this.uploading = true;
      this.uploadTask = firestorage.ref("images/" + file.name).put(file);
    },
    deleteImage() {
      firestorage
        .ref("images/" + this.fileName)
        .delete()
        .then(() => {
          this.uploading = false;
          this.uploadEnd = false;
          this.downloadURL = "";
        })
        .catch(error => {
          console.error(`file delete error occured: ${error}`);
        });
      this.$refs.form.reset();
    },
    savePersona() {
      db.collection("performers")
        .add({
          performer_id: this.performer_id,
          name: this.name,
          dept: this.dept,
          position: this.position
        })
        .then(docRef => {
          console.log("Client added: ", docRef.id);
          this.$router.push("/");
        })
        .catch(error => {
          console.error("Error adding performer: ", error);
        });
    }
  },

  created() {
    this.persona_type =
      this.$route.params.persona_type.toUpperCase() == "FEM"
        ? "FEMALE"
        : "MALE";
  },
  watch: {
    uploadTask: function() {
      this.uploadTask.on(
        "state_changed",
        sp => {
          this.progressUpload = Math.floor(
            (sp.bytesTransferred / sp.totalBytes) * 100
          );
        },
        null,
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.uploadEnd = true;
            this.downloadURL = downloadURL;
            this.$emit("downloadURL", downloadURL);
          });
        }
      );
    }
  }
};
</script>

<style scoped>
</style>