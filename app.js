const firebaseConfig = {
    apiKey: "AIzaSyDEwB3wrPT4Hvyht3JcVjXePS_0SyvaHng",
    authDomain: "cleint-website.firebaseapp.com",
    databaseURL: "https://cleint-website-default-rtdb.firebaseio.com",
    projectId: "cleint-website",
    storageBucket: "cleint-website.firebasestorage.app",
    messagingSenderId: "777998640086",
    appId: "1:777998640086:web:ce59e9f2a20e65d7e6ba77"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// --- NAVIGATION ---
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    window.scrollTo(0,0);
}

// --- AUTHENTICATION ---
function handleAuth() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const name = document.getElementById('reg-name').value;
    const errorPlate = document.getElementById('auth-error');

    if(!email || !pass || !name) { 
        errorPlate.innerText = "Fill all fields!"; 
        return; 
    }

    auth.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            db.ref('users/' + userCredential.user.uid).set({ fullName: name, email: email });
            document.getElementById('login-screen').style.transform = 'translateY(-100%)';
        })
        .catch((error) => { 
            errorPlate.innerText = error.message; 
        });
}

// --- SAVE CONTACT MESSAGE ---
function saveMessage() {
    const name = document.getElementById('msg-name').value;
    const email = document.getElementById('msg-email').value;
    const content = document.getElementById('msg-content').value;
    const status = document.getElementById('msg-status');

    if(!name || !email || !content) { 
        status.innerText = "❌ Form incomplete!"; 
        return; 
    }

    db.ref('contact_messages').push().set({ name, email, message: content })
        .then(() => {
            status.innerText = "✅ Sent!";
            document.getElementById('msg-name').value = "";
            document.getElementById('msg-email').value = "";
            document.getElementById('msg-content').value = "";
        });
}
