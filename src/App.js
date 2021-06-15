import "./App.css";
import React from "react";

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
						<li>Frontend developer</li>
						<li className="contacts">
							<span>
								<img src="./img/viber.png" alt="" />
								<span>+38 063 2209770</span>
							</span>
							<span>vitaljan@gmail.com</span>
							<span>@vital_jan</span>
						</li>
					</ul>
				</header>
				<main>
					<div className="chapter">
						Програмуванням захоплююсь з 15 років
						<br />
						Перший прибуток в it отримав у 9 класі середньої школи
					</div>
					<div className="chapter">
						Перший комерційний досвід — фізфак університету
						ім.Шевченка. Самостійно розробив комплекс введення та
						друку кирілічних символів, драйвери відеосистеми та
						клавіатури, текстовий редактор для наукових текстів та
						інше (Turbo-pascal, Assembler)
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
						Військове волонтерство 2014-2017р поставило хрест на
						моїй кар’єрі в комерційній сфері. Було обране рішення
						поновити знання та повернутись в it.
					</div>
					<div className="chapter">
						Впродовж 2018-19р навчався в комп’ютерній академії “Шаг”
						за фахом “Розробка і просування web-проектів”,
						паралельно працюючи в таксі та виховуючи дітей.
					</div>
					<div className="chapter"></div>
					<div className="chapter"></div>
					<div className="chapter"></div>
					<div className="chapter"></div>
				</main>
				<footer>FOOTER</footer>
			</div>
		);
	}
}

export default App;
