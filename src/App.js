import "./App.css";
import React from "react";

const ScrollImage = (props) => {
	return (
		<div className="scroll-image" style={{ height: props.height }}>
			<img src={props.img} style={{ top: props.top + "px" }} alt="" />
		</div>
	);
};

class App extends React.Component {
    constructor (){
        super();
        this.scrollObjects = [{height: 733, name: "asm1.jpg", windowHeight: 90}, {height: 1464, name: "pas1.jpg", windowHeight: 90}];
        this.state = {scrollers: [0, 0]};
    }

    componentDidMount () {
        this.interval = setInterval(()=>{
            let n = -1;
            let s = this.state.scrollers.map((i)=>{
                n++;
                return i < -this.scrollObjects[n].height ? this.scrollObjects[n].windowHeight : i - 1;
            });
            this.setState({scrollers: s});
        }, 40);
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
                        
							<ScrollImage height={this.scrollObjects[0].windowHeight + 'px'} img={"./img/" + this.scrollObjects[0].name} top = {this.state.scrollers[0]} />
							<ScrollImage height={this.scrollObjects[1].windowHeight + 'px'} img={"./img/" + this.scrollObjects[1].name} top = {this.state.scrollers[1]}/>
						</div>
					</div>
					<div className="chapter">
						Пізніше зробив успішну кар’єру у сфері продажів, яку
						закінчив на посаді керівника комерційного відділу
					</div>
					<div className="chapter">
						Впродовж роботи в продажах, програмування лишалось моїм
						хобі. У 2003 році створив свій перший web-сайт на HTML
						для свого відділу продажів. Самостійно розробив систему
						CRM та управлінського обліку, яка дозволила повністю
						відмовитись від 1С для відділу продажів, філіалу,
						виробництва та відділу зовнішньо-економічної діяльності.
						Впровадив в 4-х компаніях, де працював. Отримав значний
						досвід БД та SQL
					</div>
					<div className="chapter">
						Військове волонтерство 2014-2017рр. Поставило хрест на
						моїй кар’єрі в комерційній сфері. Було обране рішення
						поновити знання та повернутись в it.
					</div>
					<div className="chapter">
						Впродовж 2018-19р. Навчався в комп’ютерній академії
						“Шаг” за фахом “Розробка і просування web-проектів”,
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
