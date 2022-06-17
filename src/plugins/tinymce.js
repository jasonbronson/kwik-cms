import Vue from "vue";

Vue.prototype.$editorSettings = {
  selector: "textarea#classic",
  width: "100%",
  height: 300,
  resize: true,
  autosave_ask_before_unload: false,
  powerpaste_allow_local_images: true,
  plugins: [
    "a11ychecker advcode advlist anchor autolink codesample fullscreen help tinydrive",
    " lists link noneditable powerpaste preview",
    " searchreplace table template tinymcespellchecker visualblocks wordcount",
  ],
  toolbar:
    "a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist",
  spellchecker_dialog: true,
  spellchecker_ignore_list: ["Ephox", "Moxiecode"],
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

Vue.prototype.$editorApiKey =
  "vliyknft23ivvsc02cztohbl0gtod56byghq41x1nfk9blil";
