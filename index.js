// ข้อ 1: นาฬิกาดิจิทัล
const clockElement = document.getElementById('clock');
const toggleFormatBtn = document.getElementById('toggleFormat');
const changeColorBtn = document.getElementById('changeColor');

let is12HourFormat = true; 
let colorIndex = 0;

// ✅ สีตัวเลข (font color)
const textColors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a18cd1', '#ffff', '#111111'];

// ✅ พื้นหลังแบบ gradient
const gradients = [
    "linear-gradient(135deg, #2193b0, #6dd5ed)",
    "linear-gradient(135deg, #ff9a9e, #fad0c4)",
    "linear-gradient(135deg, #a8edea, #fed6e3)",
    "linear-gradient(135deg, #12c2e9, #c471ed, #f64f59)"
];

let bgIndex = 0;
let textIndex = 0;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let ampm = '';

    if (is12HourFormat) {
        ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12 || 12;
        hours = hours.toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}${ampm}`;
    } else {
        hours = hours.toString().padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

toggleFormatBtn.addEventListener('click', () => {
    is12HourFormat = !is12HourFormat;
    updateClock();
});

changeColorBtn.addEventListener('click', () => {
    textIndex = (textIndex + 1) % textColors.length;
    clockElement.style.color = textColors[textIndex];
});

function changeClockBg() {
    bgIndex = (bgIndex + 1) % gradients.length;
    clockElement.style.background = gradients[bgIndex];
}

setInterval(updateClock, 1000);
updateClock();

 // ข้อ 2: To-Do List
 const todoInput = document.getElementById('todoInput');
 const addTodoBtn = document.getElementById('addTodo');
 const todoList = document.getElementById('todoList');
 
 let todos = JSON.parse(localStorage.getItem('todos')) || [];
 
 function renderTodos() {
     todoList.innerHTML = '';
     todos.forEach((todo, index) => {
         const todoItem = document.createElement('div');
         todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
         
         const todoText = document.createElement('span');
         todoText.textContent = todo.text;
         
         const todoActions = document.createElement('div');
         
         const completeBtn = document.createElement('button');
         completeBtn.textContent = todo.completed ? 'ยกเลิก' : 'เสร็จสิ้น';
         completeBtn.addEventListener('click', () => toggleTodo(index));
         
         const deleteBtn = document.createElement('button');
         deleteBtn.textContent = 'ลบ';
         deleteBtn.addEventListener('click', () => deleteTodo(index));
         
         todoActions.appendChild(completeBtn);
         todoActions.appendChild(deleteBtn);
         
         todoItem.appendChild(todoText);
         todoItem.appendChild(todoActions);
         
         todoList.appendChild(todoItem);
     });
     
     localStorage.setItem('todos', JSON.stringify(todos));
 }
 
 function addTodo() {
     const text = todoInput.value.trim();
     if (text) {
         todos.push({ text, completed: false });
         todoInput.value = '';
         renderTodos();
     }
 }
 
 function toggleTodo(index) {
     todos[index].completed = !todos[index].completed;
     renderTodos();
 }
 
 function deleteTodo(index) {
     todos.splice(index, 1);
     renderTodos();
 }
 
 addTodoBtn.addEventListener('click', addTodo);
 todoInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') addTodo();
 });
 
 renderTodos();
 
 // ข้อ 3: สภาพอากาศ
 const cityInput = document.getElementById('cityInput');
 const getWeatherBtn = document.getElementById('getWeather');
 const weatherResult = document.getElementById('weatherResult');
 
 // ใช้ API จำลองเนื่องจาก OpenWeatherMap ต้องการ API Key
 // ในสภาพแวดล้อมจริง ควรใช้ API จริงและเก็บ API Key อย่างปลอดภัย
 async function getWeather() {
     const city = cityInput.value.trim();
     if (!city) {
         weatherResult.innerHTML = '<div class="error">กรุณากรอกชื่อเมือง</div>';
         return;
     }
     
     weatherResult.innerHTML = 'กำลังโหลดข้อมูล...';
     
     try {
         // จำลองการเรียก API จริง
        //  const apiKey = 'your_api_key_here';
        //  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
         
         // ใช้การจำลองข้อมูลสำหรับตัวอย่าง
         await new Promise(resolve => setTimeout(resolve, 1000));
         
         // สุ่มข้อมูลสภาพอากาศสำหรับการสาธิต
         const mockWeatherData = {
             name: city,
             main: {
                 temp: Math.round(Math.random() * 30 + 10), // อุณหภูมิระหว่าง 10-40°C
                 humidity: Math.round(Math.random() * 50 + 30) // ความชื้นระหว่าง 30-80%
             },
             weather: [
                 {
                     description: [' แดดจัด', ' มีเมฆบางส่วน', ' มีเมฆมาก', ' ฝนตกเล็กน้อย'][Math.floor(Math.random() * 4)],
                     icon: '01d' // ไอคอนสภาพอากาศ
                 }
             ]
         };
         
         displayWeather(mockWeatherData);
     } catch (error) {
         weatherResult.innerHTML = `<div class="error">ไม่สามารถดึงข้อมูลสภาพอากาศได้: ${error.message}</div>`;
     }
 }
 
 function displayWeather(data) {
     weatherResult.innerHTML = `
         <div class="weather-card">
             <h3>สภาพอากาศที่ ${data.name}</h3>
             <p>อุณหภูมิ: ${data.main.temp}°C</p>
             <p>ความชื้น: ${data.main.humidity}%</p>
             <p>สภาพ: ${data.weather[0].description}</p>
         </div>
     `;
 }
 
 getWeatherBtn.addEventListener('click', getWeather);
 cityInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') getWeather();
 });

 function toggleTheme() {
    const root = document.documentElement;
  
    if (root.style.getPropertyValue('--bg-color') === 'black') {

      root.style.setProperty('--bg-color', 'white');
      root.style.setProperty('--text-color', 'black');
    } else {

      root.style.setProperty('--bg-color', 'black');
      root.style.setProperty('--text-color', 'white');
    }
  }
  