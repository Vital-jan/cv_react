import "./App.css";
import React from "react";

class ScaleImage extends React.Component { // scale image component
    constructor (props){
        super();
        this.iteration = 50;
        this.state = {width: props.minWidth};
        this.delta = (props.maxWidth - props.minWidth) / this.iteration;
        this.expanded = false;
    }

    click = ()=>{
        if (!this.expanded) {
            this.timer = setInterval(()=>{
                this.setState({width: this.state.width + this.delta});
                if (this.state.width >= this.props.maxWidth) {
                    this.expanded = true;
                    clearInterval(this.timer);
                }
            }, 500 / this.iteration);
        } else {
            this.timer = setInterval(()=>{
                this.setState({width: this.state.width - this.delta});
                if (this.state.width <= this.props.minWidth) {
                    this.expanded = false;
                    clearInterval(this.timer);
                }
            }, 500 / this.iteration);
        }
    }

    render (){
        return(
            <div className="scale-image">
                <img
                    src={this.props.img}
                    alt=""
                    style={{width: this.state.width}}
                    onClick={this.click}
                />
            </div>
        );
    }
}

class ScrollImage extends React.Component { // scroll image component
    // props:
    // height: component height
    // imgHeight: child image height
    // img: image filename

	constructor(props) {
        super();
        this.imgHeight = props.imgHeight;
        this.state = {top: 0};
        this.hold = false;
    }

    mouseEnter =()=>{
        this.hold = true;
    }
    mouseLeave =()=>{
        this.hold = false;
    }

    componentDidMount(){
        this.timer = setInterval(()=>{
            if (this.hold) return;
            this.setState({top: this.state.top < -this.props.imgHeight ? this.props.height : this.state.top - 1});
        }, 40);
    }

	render() {
		return (
			<div className="scroll-image" style={{ height: this.props.height }}>
				<img
					src={this.props.img}
					style={{ top: this.state.top + "px" }}
					alt=""
                    onMouseEnter={this.mouseEnter}
                    onMouseLeave={this.mouseLeave}
				/>
			</div>
		);
	}
}

class Slider extends React.Component {// slider component
	//props:
	// width - slider component width
	// height - slider component height
	// img - slider img files array
    // delay - image change delay (ms)
	constructor() {
		super();
		this.hold = false;
		this.counter = 0;
		this.state = { counter: 0 };
	}

	mouseEnter = () => {
		this.hold = true;
	};
	mouseLeave = () => {
		this.hold = false;
	};

	componentDidMount() {
		this.timer = setInterval(() => {
            if (this.hold) return;
            let opacity = 1;
            let fade = setInterval(()=>{
                this.setState({opacity: opacity});
                opacity -= 0.05;
                if (opacity <= 0) {
                    clearInterval(fade);
                    this.counter++;
                    if (this.counter > this.props.img.length - 1) this.counter = 0;
                    this.setState({ counter: this.counter });
                    this.setState({opacity: 1});
                }
            }, 10);
		}, this.props.delay);
	}

	render() {
		let counter = this.state.counter < this.props.img.length ? this.state.counter : this.props.img.length - 1;
		let img = this.props.img[counter];
		let nextImg =
			this.props.img[
				counter < this.props.img.length - 1 ? counter + 1 : 0
			];
		return (
			<div
				className="slider"
				width={this.props.width}
				height={this.props.height}
				onMouseEnter={this.mouseEnter}
				onMouseLeave={this.mouseLeave}
			>
				<img
					className="next-img"
					src={nextImg}
					alt=""
					// style={{ left: this.props.width}}
				/>
				<img
                    className="img"
                    src={img}
                    style={{opacity: this.state.opacity}}
                    alt="" />
			</div>
		);
	}
}

class App extends React.Component {
	constructor() {
		super();
		this.slider1 = []; // slider img files array
		for (let n = 0; n <= 7; n++) this.slider1[n] = `./img/scr${n + 1}.jpg`;
	}

	render() {
		return (
			<div className="App">
				<header>
					<ul className="header-content">
						<li>Віталій Коломієць</li>
						<li>Junior frontend developer</li>
						<li className="contacts">
							<span>
								<img src="./img/viber.png" alt="" />
								<span><a href="tel:+380632209770">+38 063 2209770</a></span>
							</span>
							<span><a href="mailto:vitaljan@gmail.com">vitaljan@gmail.com</a></span>
							<span>@vital_jan</span>
						</li>
					</ul>
				</header>
				<main>
                    <div className="chapter">
                        <h2>
                            Стек технологій:
                        </h2>
                        <p>
                            HTML, SASS, JS, Jquery, Bootstrap, ReactJS, PHP, MySQL, Codeigniter, Github, Linux Ubuntu, VS Code.
                        </p>
                        <p>
                            Також доводилось працювати з Ruby, Python + Django, PostgreSQL, MariaDB, 1C bitrix.
                        </p>
                        <p>
                            Цікавлюсь також NodeJS, вивчаю English та ReactJS.
                        </p>
                        <p>
                            Прагну зайняти своє місце в команді професіоналів, підвищити рівень кваліфікації, здобути нових знань.
                        </p>
                        <p>
                            Цей сайт розроблений на React JS та є зразком моєї роботи. Інші зразки робіт на React, досвід роботи та деякі мої проекти дивіться <a href="#examples">тут.</a>
                        </p>
                    </div>
					<div className="chapter">
                    <p>
                        Програмуванням захоплююсь з 15 років.
						Перший прибуток в it отримав у 9 класі середньої школи.
                    </p>
                    <p>
						Перший комерційний досвід — фізфак університету
						ім.Шевченка. Самостійно розробив комплекс введення та
						друку кирілічних символів, драйвери відеосистеми та
						клавіатури, текстовий редактор для наукових текстів та
						інше (Turbo-pascal, Assembler)
                    </p>
						<div className="code-example">
							<ScrollImage imgHeight={733} img={"./img/asm1.jpg"} height={90} />
							<ScrollImage imgHeight={1464} img={"./img/pas1.jpg"} height={90} />
						</div>
					</div>
					<div className="chapter">
						<p>
							Пізніше зробив успішну кар’єру у сфері продажів, яку
							закінчив на посаді керівника комерційного відділу.
							Впродовж роботи в продажах, програмування лишалось
							моїм хобі.
						</p>
						<p>
							У 2003 році створив свій перший web-сайт на HTML для
							свого відділу продажів.
						</p>
						<p>
							Самостійно розробив систему CRM та управлінського
							обліку, яка дозволила повністю відмовитись від 1С
							для відділу продажів, філіалу, виробництва та
							відділу зовнішньо-економічної діяльності та
							впровадив її в 4-х компаніях, де працював. Отримав
							значний досвід БД та SQL.
						</p>
						<Slider img={this.slider1} width={500} height={300} delay={2500}/>
					</div>
					<div className="chapter">
                        <p>
                            Військове волонтерство 2014-2017р поставило хрест на
                            моїй кар’єрі в комерційній сфері. Було обране рішення
                            поновити знання та повернутись в it.
                        </p>
                        <p>
                            Впродовж 2018-19р навчався в комп’ютерній академії “Шаг”
                            за фахом “Розробка і просування web-проектів”,
                            паралельно працюючи в таксі та виховуючи дітей.
                        </p>
                        <div>
                            <ScaleImage img="./img/diplom.jpg" minWidth={200} maxWidth={600}/>
                        </div>
                        <p></p>
                        <p>
                            З березня по липень 2020р працював як trainee у it стартапі. Стек технологій: Ruby, Python+Django, PostgreSQL, ReactJS. Навчився працювати в команді (pull requests, code review, standups, sprint plannings, trello, jira, slack, clockify).
                        </p>
					</div>
                    <div className="chapter"></div>
                    <h2 id="examples">Досвід та зразки робіт</h2>
					<div className="chapter">
                        <h3>
                            <a href="http://explorer.org.ua/react/" target="blanc">Мій перший React проект:</a>
                        </h3>
                        <iframe title="clock" width="400px" height="350px" src="http://explorer.org.ua/react/" frameBorder="0"></iframe>
                    </div>
					<div className="chapter">
                        <h3>
                            <a href="http://explorer.org.ua/yalantis/" target="blanc">Тестове завдання по ReactJS</a>
                        </h3>
                    </div>
					<div className="chapter">
                        <a href="http://new.bak.lviv.ua" target="blanc">
                            <h3>
                                Мій перший fullstack проект:
                            </h3>
                            <img src="./img/pr_bak.png" alt="" className="center" />
                        </a>
                        <p>
                            Розроблено наприкінці навчання в академії на замовлення львівського видавництва "Бак". Технології: PHP, MySQL, JS. Усі модулі самописні. Реалізовано авторизацію для сайт-адміна, адмін панель для редагування контенту, додавання/редагування/видалення елементів БД, завантаження та керування зображеннями.
                        </p>
                    </div>
					<div className="chapter">
                        <a href="http://explorer.org.ua/wine" target="blank">
                            <h3>Ще один з проектів:</h3>
                            <img className="center" src="./img/pr_wine.png" alt="" />
                        </a>
                        <p>
                            Замовник - World's Finest Wines, LLC, Greensboro, USA. Розробив макет, дизайн, скріпти. Технології: HTML, SASS, JS. Усі компоненти (анімація, слайдери, скроли) самописні. Особливої уваги приділив розділу “Explore our wines”.
                        </p>
                    </div>
					<div className="chapter">
                        <a href="http://explorer.org.ua/game/" target="blank">
                            <h3>А цю гру я зробив для своїх дітей:</h3>
                            <img className="center" src="./img/pr_game.png" alt="" />
                        </a>
                        <p>
                            Гра "істівне-неїстівне із саунд ефектами. OOP JS."
                        </p>
                    </div>
					<div className="chapter">
                        <a href="http://explorer.org.ua/projects/cross-zero/" target="blank">
                            <h3>А ось приклад програмування простої логіки:</h3>
                            <img className="center" src="./img/pr_cross.png" alt="" />
                        </a>
                        <p>
                            Спробуйте перемогти “Експерта”, я навмисно залишив таку можливість)
                        </p>
                    </div>
                    <div className="chapter"></div>
                    <div className="chapter">
                        <h2>
                            Досвід комерційної розробки з грудня 2020 року:
                        </h2>
                        <div className="separator-horizontal"></div>
                        <p>
                            Компанія "СТІБ", fullstack (PHP, JS, Jquery, bitrix ORM). Розробка та інтеграція інструменту для імпорту та синхронізації каталогу постачальника інтернет магазину, підтримка та допрацювання інших сайтів на бітрікс.
                        </p>
                        <div className="separator-horizontal"></div>
                        <p>
                            Компанія "GT1", fullstack (PHP, Codeigniter, MariaDB, JS, Jquery, Bootstrap). Підтримка web-проекту для потреб колл-центра.
                        </p>
                        <p>
                            В теперішній час займаюсь розробкою власного стартапу (fullstack: PHP, Codeigniter, MySQL,JS, Jquery, Bootstrap).
                        </p>
                    </div>
				</main>
				<footer>FOOTER</footer>
			</div>
		);
	}
}

export default App;
