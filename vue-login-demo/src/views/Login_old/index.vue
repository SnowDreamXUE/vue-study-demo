<template>
<div class="login-container">
    <div class="blob"></div>
    <div class="wrapper">
        <form action="" class="login-form">
            <h2>Login</h2>
            <div class="input-box">
                <span class="icon"><ion-icon name="mail"></ion-icon></span>
                <input type="email" required>
                <label>Email</label>
            </div>
            <div class="input-box">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" required>
                <label>Password</label>
            </div>
            <div class="remember-forgot">
                <label><input type="checkbox">Remember me</label>
                <a href="#">Forgot Password ?</a>
            </div>
            <button type="submit">Login</button>
            <div class="register-link">
                <p>Don't have an account ? <a href="#">Register</a></p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    mounted() {
        // 动态加载Ionicons脚本
        const moduleScript = document.createElement('script');
        moduleScript.type = 'module';
        moduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
        document.head.appendChild(moduleScript);

        const nomoduleScript = document.createElement('script');
        nomoduleScript.nomodule = true;
        nomoduleScript.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
        document.head.appendChild(nomoduleScript);
    }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    background: #1f1f47;
    overflow: hidden;
}

.wrapper {
    position: relative;
    width: 400px;
    height: 450px;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(31,38,135,.37);
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-form {
    width: 320px;
}
h2 {
    font-size: 2em;
    color: #ffffff;
    text-align: center;
}

.input-box {
    position: relative;
    width: 320px;
    margin: 30px 0;
    border-bottom: 2px solid #ffffff;
}

.input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    pointer-events: none;
    color: #ffffff;
    transition: .5s;
}

.input-box input:focus ~ label,
.input-box input:valid ~ label {
    top: 5px;
}

.input-box input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #ffffff;
    padding: 0 35px 0 5px;
}

.input-box .icon {
    position: absolute;
    right: 8px;
    color: #ffffff;
    font-size: 1.2em;
    line-height: 57px;
}

.remember-forgot {
    margin: -15px 0 15px;
    font-size: .9em;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
}

.remember-forgot a {
    color: #ffffff;
    text-decoration: none;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

.remember-forgot label input {
    accent-color: #fa709a;
    margin-right: 3px;
}

button {
    width: 100%;
    height: 45px;
    background: #fa709a;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1em;
    color: #ffffff;
    font-weight: 500;
}

.register-link {
    font-size: .9em;
    text-align: center;
    color: #ffffff;
    margin: 25px 0 10px;
}

.register-link p a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
}

.register-link p a:hover {
    text-decoration: underline;
}

.blob {
    position: absolute;
    width: 500px;
    height: 500px;
    background: linear-gradient(180deg, rgba(47,184,255, .42) 31.77%, #5c9df1 100%);
    border-radius: 24% 76% 35% 65% / 27% 36% 64% 73%;
    transform: translate(-100px, -50px) rotate(-90deg);
    transition: 1s cubic-bezier(.07, .8, .16, 1);
    animation: animateBlob 20s infinite alternate;
}

.blob:hover {
    width: 520px;
    height: 520px;
    filter: blur(30px);
    box-shadow:
            inset 0 0 0 5px rgba(255,255,255,.6),
            inset 100px 100px 0 0 #fa709a,
            inset 200px 200px 0 0 #784ba8,
            inset 300px 300px 0 0 #2b86c5;
}

@keyframes animateBlob {
    100% {
        transform: translate(300px, 50px) rotate(-10deg);
        border-radius: 76% 24% 33% 67% / 68% 55% 45% 32%;
    }

}

</style>
