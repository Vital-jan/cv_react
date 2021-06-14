import "./App.css";
import React from "react";

const ScrollImage = (props) => {
	return (
		<div className="scroll-image" style={{ height: props.height }}>
			<img src={props.img} style={{ top: props.top + "px" }} alt="" />
		</div>
	);
};

const Slider = (props) => { // slider component
    //props:
    // width - slider component width
    // height - slider component height
    // img - slider img files array
    // counter - the current image number
    let counter = props.counter < props.img.length ? props.counter : props.img.length - 1;
    let img = props.img[counter];
    let nextImg = props.img[counter < props.img.length - 1 ? counter + 1 : 0];
    return (
        <div className="slider" width={props.width} height={props.height}>
            <img className = "img" src={'./img/' + img} alt="" />
            <img className = "next-img" src={'./img/' + nextImg} alt="" style={{left: props.width}}/>
        </div>
    );
};

class App extends React.Component {
	constructor() {
		super();
		this.scrollObjects = [
			{ height: 733, name: "asm1.jpg", windowHeight: 90 },
			{ height: 1464, name: "pas1.jpg", windowHeight: 90 },
		];
		this.state = { scrollers: [0, 0] };
        this.slider1 = [];
        this.counter = 0;
        this.timer = 0;
        for (let n = 0; n <= 7; n++) this.slider1[n] = `scr${n+1}.jpg`;
        this.state.slider = {counter: 0};
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			let n = -1;
			let s = this.state.scrollers.map((i) => {
				n++;
				return i < -this.scrollObjects[n].height
					? this.scrollObjects[n].windowHeight
					: i - 1;
			});
			this.setState({ scrollers: s });
            if (this.timer % 20 === 0) {
                console.log(this.counter)
                this.counter++;
                if (this.counter > this.slider1.length - 1) this.counter = 0;
                this.setState({slider: {counter: this.counter}});
            }
            this.timer++;
		}, 50);
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
							<ScrollImage
								height={
									this.scrollObjects[0].windowHeight + "px"
								}
								img={"./img/" + this.scrollObjects[0].name}
								top={this.state.scrollers[0]}
							/>
							<ScrollImage
								height={
									this.scrollObjects[1].windowHeight + "px"
								}
								img={"./img/" + this.scrollObjects[1].name}
								top={this.state.scrollers[1]}
							/>
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
                        <Slider img={this.slider1} width={500} height={300} counter = {this.state.slider.counter}></Slider>
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
