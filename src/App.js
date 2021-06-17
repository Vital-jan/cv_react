import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import { botID, chatID } from "./config";

const telegramURL = `https://api.telegram.org/bot${botID}/sendMessage?chat_id=${chatID}&text=`;

const ReadMore = (props) => {
	// "read more" text component
	//props: component
	//text - content
	//buttonTextUp - text on button for maximize
	//buttonTextDown - text on button for minimize
	//minHeight - minimized size
	const click = () => {
		setExpand(!expand);
	};
	const [expand, setExpand] = useState(false);
	return (
		<div>
			<div
				className="read-more"
				style={{ height: expand ? "auto" : props.minHeight }}
			>
				{props.text}
			</div>
			<button onClick={click}>
				{expand ? props.buttonTextDown : props.buttonTextUp}
			</button>
		</div>
	);
};
const ReadMoreTask = () => {
	return (
		<div>
			<p>
				<b>ТЗ:</b>
			</p>
			<p>
				Завантажити список співробітників з сервера, відобразити
				англійський алфавіт. Співробітник = lastName + firstName.
				Відобразити співробітників, за алфавітом, сортуємо за lastName.
				Якщо у літери немає співробітників, ставимо прочерк. Біля
				кожного співробітника є по 2 radioButton. По дефолту ‘not
				active’, значення цього radio item буде = false. Якщо хочемо
				вибирати співробітника, натискаємо на ‘active’, зі значенням =
				true. Обраний співробітник повинен бути виділений кольором.
			</p>
			<p>
				У правій частині сторінки є блок Employees birthday, в якому
				відображаються обрані співробітники, згруповані за назвою місяця
				їх дня народження та відсортовані по їх lastName (від А до Я).
				Місяці повинні починатися з місяця виконання цього завдання і
				далі по черзі. Якщо в місяці немає обраних
				співробітників/співробітника, назву місяця не виводимо. Якщо ви
				не обрали нікого зі співробітників, то в блоці Employees
				birthday пишемо Employees List is empty.
			</p>
			<p>
				Якщо сторінку перезавантажено - обрані співробітники в правому
				блоку повинні бути збережені. А в лівому блоку Employees, у
				даних співробітників повинен бути активним radio item ‘active’.
			</p>
			<p>Вимоги до коду:</p>
			<ul>
				<li>Використання Prettier</li>
				<li>
					Використання функціональних компонентів та хуків, ES6
					features.{" "}
				</li>
				<li>
					Мінімальний розподіл проекту на логічні частини / папки.
				</li>
			</ul>
		</div>
	);
};
class ScaleImage extends React.Component {
	// scale image component
	constructor(props) {
		super();
		this.iteration = 50;
		this.state = { width: props.minWidth };
		this.delta = (props.maxWidth - props.minWidth) / this.iteration;
		this.expanded = false;
	}

	click = () => {
		if (!this.expanded) {
			this.timer = setInterval(() => {
				this.setState({ width: this.state.width + this.delta });
				if (this.state.width >= this.props.maxWidth) {
					this.expanded = true;
					clearInterval(this.timer);
				}
			}, 500 / this.iteration);
		} else {
			this.timer = setInterval(() => {
				this.setState({ width: this.state.width - this.delta });
				if (this.state.width <= this.props.minWidth) {
					this.expanded = false;
					clearInterval(this.timer);
				}
			}, 500 / this.iteration);
		}
	};

	render() {
		return (
			<div className="scale-image">
				<img
					src={this.props.img}
					alt=""
					style={{ width: this.state.width }}
					onClick={this.click}
				/>
			</div>
		);
	}
}

class ScrollImage extends React.Component {
	// scroll image component
	// props:
	// height: component height
	// imgHeight: child image height
	// img: image filename

	constructor(props) {
		super();
		this.imgHeight = props.imgHeight;
		this.state = { top: 0 };
		this.hold = false;
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
			this.setState({
				top:
					this.state.top < -this.props.imgHeight
						? this.props.height
						: this.state.top - 1,
			});
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

class Slider extends React.Component {
	// slider component
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
			let fade = setInterval(() => {
				this.setState({ opacity: opacity });
				opacity -= 0.05;
				if (opacity <= 0) {
					clearInterval(fade);
					this.counter++;
					if (this.counter > this.props.img.length - 1)
						this.counter = 0;
					this.setState({ counter: this.counter });
					this.setState({ opacity: 1 });
				}
			}, 10);
		}, this.props.delay);
	}

	render() {
		let counter =
			this.state.counter < this.props.img.length
				? this.state.counter
				: this.props.img.length - 1;
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
					style={{ opacity: this.state.opacity }}
					alt=""
				/>
			</div>
		);
	}
}

const Telegram = () => {
	const [message, setMessage] = useState("Повідомлення");
	const [status, setStatus] = useState("");
	const [statusCode, setStatusCode] = useState(0);
	const submit = (e) => {
		e.preventDefault();
		axios
			.get(`${telegramURL}${message}`)
			.then(function (response) {
				setStatus("Повідомлення надіслане.");
				setStatusCode(200);
				setTimeout(() => {
					setStatus("");
				}, 3000);
			})
			.catch(function (error) {
				setStatus("Повідомлення не надіслане, повторіть спробу.");
				setStatusCode(404);
				setTimeout(() => {
					setStatus("");
				}, 5000);
			});
	};
	const change = (e) => {
		setMessage(e.target.value);
	};
	const StatusLine = () => {
		return (
			<h3>
				<span
					className={
						"status-line" + (statusCode === 404 ? " error" : "")
					}
				>
					{status}
				</span>
			</h3>
		);
	};
	return (
		<form onSubmit={submit}>
			<h3>Написати мені в telegram:</h3>
			<textarea rows="5" value={message} onChange={change}></textarea>
			<StatusLine />
			<button type="submit">Надіслати</button>
		</form>
	);
};

const Invite = () => {
	const action = (e) => {
		e.preventDefault();
        let msg = `Запрошення%0aКомпанія: ${company}%0aІм'я: ${name}%0aКонтакти: ${contacts}%0aПовідомлення:%0a${message}`;
		axios
			.get(`${telegramURL}${msg}`)
			.then(function (response) {
				// setStatus("Повідомлення надіслане.");
				// setStatusCode(200);
				// setTimeout(() => {
				// 	setStatus("");
				// }, 3000);
			})
			.catch(function (error) {
				// setStatus("Повідомлення не надіслане, повторіть спробу.");
				// setStatusCode(404);
				// setTimeout(() => {
				// 	setStatus("");
				// }, 5000);
			});
	};
	const companyChange = (e) => {
		setCompany(e.target.value);
	};
	const nameChange = (e) => {
		setName(e.target.value);
	};
	const contactsChange = (e) => {
		setContacts(e.target.value);
		setSubmitEnable(e.target.value.length > 7 ? true : false);
	};
	const messageChange = (e) => {
		setMessage(e.target.value);
	};
	const [company, setCompany] = useState("");
	const [name, setName] = useState("");
	const [contacts, setContacts] = useState("");
	const [message, setMessage] = useState("");
	const [submitEnable, setSubmitEnable] = useState(false);

	const Button = () => {
        let disabled = submitEnable ? '' : 'disabled';
		return <button type="submit" disabled={disabled} >Запросити</button>;
	};

	return (
		<form onSubmit={action} className="invite">
			<h2>Запрошення на співбесіду</h2>
			<input
				type="text"
				value={company}
				placeholder="Ваша компанія"
				onChange={companyChange}
			/>
			<input
				type="text"
				value={name}
				placeholder="Ваше ім'я (посада)"
				onChange={nameChange}
			/>
			<input
				type="text"
				value={contacts}
				placeholder="*Ваші контактні дані (обов'язкове поле)"
				onChange={contactsChange}
			/>
			<textarea
				value={message}
				rows="5"
				placeholder="Повідомлення"
				onChange={messageChange}
			></textarea>
			<Button />
		</form>
	);
};

const Header = () => {
	return (
		<header>
			<ul className="header-content">
				<li>Віталій Коломієць</li>
				<li>Junior frontend developer</li>
				<li className="contacts">
					<span>
						<img src="./img/viber.png" alt="" />
						<span>
							<a href="tel:+380632209770">+38 063 2209770</a>
						</span>
					</span>
					<span>
						<a href="mailto:vitaljan@gmail.com">
							vitaljan@gmail.com
						</a>
					</span>
					<span>@vital_jan</span>
				</li>
			</ul>
		</header>
	);
};

class App extends React.Component {
	constructor() {
		super();
		this.slider1 = []; // slider img files array
		for (let n = 0; n <= 7; n++) this.slider1[n] = `./img/scr${n + 1}.jpg`;
	}

	render() {
		return (
			<div className="App">
				<Header />
				<main>
					<div className="chapter">
						<h2>Стек технологій:</h2>
						<p>
							HTML, SASS, JS, Jquery, Bootstrap, ReactJS, PHP,
							MySQL, Codeigniter, Github, Linux Ubuntu, VS Code.
						</p>
						<p>
							Також доводилось працювати з Ruby, Python + Django,
							PostgreSQL, MariaDB, 1C bitrix.
						</p>
						<p>
							Цікавлюсь також NodeJS, вивчаю English та ReactJS.
						</p>
						<p>
							Прагну зайняти своє місце в команді професіоналів,
							підвищити рівень кваліфікації, здобути нових знань.
						</p>
						<p>
							Цей сайт розроблений на React JS з використанням
							Axios та Telegram API та є зразком моєї роботи.
						</p>
						<p>
							<a
								href="https://github.com/Vital-jan/cv_react"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
						<p>
							Інші зразки робіт на React, досвід роботи та деякі
							мої проекти дивіться <a href="#examples">тут.</a>
						</p>
					</div>
					<div className="chapter">
						<p>
							Програмуванням захоплююсь з 15 років. Перший
							прибуток в it отримав у 9 класі середньої школи.
						</p>
						<p>
							Перший комерційний досвід — фізфак університету
							ім.Шевченка. Самостійно розробив комплекс введення
							та друку кирилічних символів, драйвери відеосистеми
							та клавіатури, текстовий редактор для наукових
							текстів та інше (Turbo-pascal, Assembler)
						</p>
						<div className="code-example">
							<ScrollImage
								imgHeight={733}
								img={"./img/asm1.jpg"}
								height={90}
							/>
							<ScrollImage
								imgHeight={1464}
								img={"./img/pas1.jpg"}
								height={90}
							/>
						</div>
					</div>
					<div className="chapter">
						<p>
							Пізніше зробив успішну кар’єру у сфері продажів, яку
							закінчив на посаді керівника комерційного відділу.
							Впродовж роботи в продажах програмування лишалось
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
						<Slider
							img={this.slider1}
							width={500}
							height={300}
							delay={2500}
						/>
					</div>
					<div className="chapter">
						<p>
							Військове волонтерство 2014-2017р поставило хрест на
							моїй кар’єрі в комерційній сфері. Було обране
							рішення поновити знання та повернутись в it.
						</p>
						<p>
							Впродовж 2018-19р навчався в комп’ютерній академії
							“Шаг” за фахом “Розробка і просування web-проектів”,
							паралельно працюючи в таксі та виховуючи дітей.
						</p>
						<div>
							<ScaleImage
								img="./img/diplom.jpg"
								minWidth={200}
								maxWidth={600}
							/>
						</div>
						<p></p>
						<p>
							З березня по липень 2020р працював як trainee у it
							стартапі. Стек технологій: Ruby, Python+Django,
							PostgreSQL, ReactJS. Навчився працювати в команді
							(pull requests, code review, standups, sprint
							plannings, trello, jira, slack, clockify).
						</p>
					</div>
					<div className="chapter"></div>
					<h2 id="examples">Досвід та зразки робіт</h2>
					<div className="chapter">
						<h3>
							<a
								href="http://explorer.org.ua/react/"
								target="blanc"
							>
								Мій перший React проект:
							</a>
						</h3>
						<a href="explorer.org.ua">
							<iframe
								seamless
								title="clock"
								src="http://explorer.org.ua/react/"
								frameBorder="0"
							></iframe>
						</a>
						<p>
							<a
								href="https://github.com/Vital-jan/react_clock"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
					</div>
					<div className="separator-horizontal"></div>
					<div className="chapter">
						<a
							href="http://explorer.org.ua/yalantis/"
							target="blanc"
						>
							<h3>Тестове завдання по ReactJS:</h3>
							<img
								className="center"
								src="./img/pr_yalantis.png"
								alt=""
							/>
						</a>
						<p>
							<a
								href="https://github.com/vitaljantestjob/yalantis_react"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
						<ReadMore
							minHeight="3.5em"
							text={<ReadMoreTask />}
							buttonTextUp="Показати більше"
							buttonTextDown="Згорнути"
						/>
					</div>
					<div className="separator-horizontal"></div>
					<div className="chapter">
						<a href="http://new.bak.lviv.ua" target="blanc">
							<h3>Мій перший fullstack проект:</h3>
							<img
								src="./img/pr_bak.png"
								alt=""
								className="center"
							/>
						</a>
						<p>
							<a
								href="https://github.com/Vital-jan/bak"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
						<p>
							Розроблено наприкінці навчання в академії на
							замовлення львівського видавництва "Бак".
							Технології: PHP, MySQL, JS, AJAX. Усі модулі
							самописні. Реалізовано авторизацію для сайт-адміна,
							адмін панель для редагування контенту,
							додавання/редагування/видалення елементів БД,
							завантаження та керування зображеннями.
						</p>
					</div>
					<div className="separator-horizontal"></div>
					<div className="chapter">
						<a href="http://explorer.org.ua/wine" target="blank">
							<h3>Ще один з проектів:</h3>
							<img
								className="center"
								src="./img/pr_wine.png"
								alt=""
							/>
						</a>
						<p>
							<a
								href="https://github.com/Vital-jan/wine"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
						<p>
							Замовник - World's Finest Wines, LLC, Greensboro,
							USA. Розробив макет, дизайн, скріпти. Технології:
							HTML, SASS, JS. Усі компоненти (анімація, слайдери,
							скроли) самописні. Особливої уваги приділив розділу
							“Explore our wines”.
						</p>
					</div>
					<div className="separator-horizontal"></div>
					<div className="chapter">
						<a href="http://explorer.org.ua/game/" target="blank">
							<h3>А цю гру я зробив для своїх дітей:</h3>
							<img
								className="center"
								src="./img/pr_game.png"
								alt=""
							/>
						</a>
						<p>
							<a
								href="https://github.com/Vital-jan/game-food"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
						<p>
							Гра "істівне-неїстівне із саунд ефектами. OOP JS."
						</p>
					</div>
					<div className="separator-horizontal"></div>
					<div className="chapter">
						<a
							href="http://explorer.org.ua/projects/cross-zero/"
							target="blank"
						>
							<h3>А ось приклад програмування простої логіки:</h3>
							<img
								className="center"
								src="./img/pr_cross.png"
								alt=""
							/>
						</a>
						<p>
							<a
								href="https://github.com/ITStep27/cross-zero"
								target="blanc"
							>
								<img src="./img/github.jpg" alt="" />
							</a>
						</p>
						<p>
							Спробуйте перемогти “Експерта”, я навмисно залишив
							таку можливість)
						</p>
					</div>
					<div className="chapter"></div>
					<div className="chapter">
						<h2>Досвід комерційної розробки з грудня 2020 року:</h2>
						<div className="separator-horizontal"></div>
						<p>
							Компанія "СТІБ", fullstack (PHP, JS, Jquery, bitrix
							ORM). Розробка та інтеграція інструменту для імпорту
							та синхронізації каталогу постачальника інтернет
							магазину, підтримка та допрацювання інших сайтів на
							бітрікс.
						</p>
						<div className="separator-horizontal"></div>
						<p>
							Компанія "GT1", fullstack (PHP, Codeigniter,
							MariaDB, JS, Jquery, Bootstrap). Підтримка
							web-проекту для потреб колл-центра.
						</p>
						<div className="separator-horizontal"></div>
						<p>
							В теперішній час займаюсь розробкою власного
							стартапу (fullstack: PHP, Codeigniter, MySQL,JS,
							Jquery, Bootstrap).
						</p>
						<div className="separator-horizontal"></div>
					</div>
					<div className="chapter">
						<Invite />
					</div>
					<div className="chapter">
						<Telegram />
					</div>
				</main>

				<footer></footer>
			</div>
		);
	}
}

export default App;
