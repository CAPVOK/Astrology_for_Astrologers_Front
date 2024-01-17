import "./AboutPage.css";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import { BreadCrumbs } from "../../components";
import { Col, Container, Row } from "react-bootstrap";

export const AboutPage: FC = () => {
  const location = useLocation();

  return (
    <div>
      <BreadCrumbs
        location={location}
        crumbs={[{ label: "О нас", path: "" }]}
        isCloseButton={false}
        isFixed={false}
      />
      <Container className="py-3">
        <Row>
          <Col>
            <h2 className="mb-4 shine">
              Добро пожаловать в захватывающее космическое путешествие!
            </h2>
            <p className="lead">
              Мы — команда энтузиастов, объединенных страстью к астрономии и
              астрологии. Наше приложение "Астрономия для Астрологов" создано с
              любовью к звездам, планетам и таинствам небес.
            </p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={6}>
            <h3 className="mb-3 colored">Кто мы:</h3>
            <p>
              Мы — группа энтузиастов, преданных изучению космоса и тайн,
              которые он хранит. Сочетание научного интереса и мистического
              восторга вдохновляет нас делиться удивительными открытиями о
              планетах и звездах.
            </p>
          </Col>
          <Col md={6}>
            <h3 className="mb-3 colored">Наша миссия:</h3>
            <p>
              Наша миссия - сделать космические знания доступными для каждого,
              вне зависимости от уровня интереса или знаний. Мы стремимся не
              только предоставить информацию о планетах, но и раскрыть, как их
              движение влияет на астрологические аспекты и знаки зодиака.
            </p>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h3 className="mb-3 colored">Что Мы Предлагаем:</h3>
            <ul>
              <li className="mb-2">
                <strong>Информация о Планетах:</strong> Глубокие знания о каждой
                планете в Солнечной системе, их характеристиках и истории
                открытий.
              </li>
              <li className="mb-2">
                <strong>Влияние на Зодиакальные Знаки:</strong> Расскажем, как
                движение планет формирует характеристики знаков зодиака и влияет
                на наши судьбы.
              </li>
              <li className="mb-2">
                <strong>Личные Астрологические Карты:</strong> Исследуйте, как
                планеты могут влиять на ваш характер и личную астрологическую
                карту.
              </li>
              <li className="mb-2">
                <strong>Увлекательные Факты:</strong> Погружайтесь в
                увлекательные факты о космосе, которые заставят вас восхищаться
                бескрайним простором вселенной.
              </li>
            </ul>
            <p className="mt-4">
              Присоединяйтесь к нам в этом захватывающем путешествии по звездам
              и дайте астрономии и астрологии слияние, которого вы никогда не
              забудете!
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
