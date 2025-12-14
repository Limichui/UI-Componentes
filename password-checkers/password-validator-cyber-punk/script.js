

const input = document.querySelector(
    ".input__field");
const inputIcon = document.querySelector(
    ".input__icon");
const passwordStrength = document.querySelector(
    ".progress-bar");

const passwordLabel = document.getElementById('strength-label');

inputIcon.addEventListener("click", (e) => {
    e.preventDefault();

    inputIcon.setAttribute(
        'src', 
        input.getAttribute('type') === 'password' ? 'assets/eye-off.svg' : 'assets/eye.svg'
    );

    input.setAttribute(
        'type', 
        input.getAttribute('type') === 'password' ? 'text' : 'password'
    );
});

input.addEventListener("keyup", 
    function(){
        let pass = document.getElementById(
            "password"
        ).value;
        checkStrength(pass);
    }
);

// Reglas de validación de contraseña
const rules = [{
    name: 'low-upper-case',
    pattern: /([a-z].*[A-Z])|([A-Z].*[a-z])/,
}, {
    name: 'one-number',
    pattern: /([0-9])/,
}, {
    name: 'one-special-char',
    pattern: /([!,%,&,@,#,$,^,*,?,_,~])/,
}, {
    name: 'eight-character',
    pattern: /.{8,}/,
}];

const checkRule = (
    password, strength, { pattern, name }
) => {
    if (password.match(pattern)) {
        strength += 1;
        const img = document.querySelector(
            `.${name} img`
        );
        img.src = 'assets/check.svg';
    } else {
        const img = document.querySelector(
            `.${name} img`
        );        
        img.src = 'assets/uncheck.svg';
    }

    return strength;
}

// Reglas de progreso de seguridad de la contraseña
const passwordStrengthProgressRule = [
    {
        maxStrength: 1,
        width: '10%',
        class: 'danger',
        label: 'Débil'
    },
    {
        maxStrength: 3,
        width: '60%',
        class: 'warning',
        label: 'Media'
    },
    {
        maxStrength: 4,
        width: '100%',
        class: 'success',
        label: 'Fuerte'
    }
];

const makeProgressBar = (strength) => {
    const rule = passwordStrengthProgressRule.find(
        r => strength <= r.maxStrength
    );

    if (rule) {
        passwordStrength.className 
        = 'progress-bar ' + 'progress-bar-' + rule.class;
        passwordStrength.style.width = rule.width;

        passwordLabel.innerText = rule.label;
        passwordLabel.className = 'label-' + rule.class
    }
}

function checkStrength(password) {
    let strength = 0;
    rules.forEach(rule => {
        strength = checkRule(
            password, strength, rule
        )
    });

    makeProgressBar(strength);
}

