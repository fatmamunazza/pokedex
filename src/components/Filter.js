import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Modal,
  ModalFooter,
  ModalBody,
  Label,
  Button,
  Input,
  Progress,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCircleXmark,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";


import {
  TYPE_OPTIONS,
  GENDER_OPTIONS,
  STATS_OPTIONS,
} from "../constant/FilterOptions";

const Filter = ({ filterComp, showFilterComp }) => {
  const [checkBox, showCheckBox] = useState(true);
  const [radioButton, showRadioButton] = useState(true);
  const [progressBar, showProgressBar] = useState(true);
  const minValue = 0;
  const maxValue = 240;
  const progress = 120;
  return (
    <div>
      {filterComp && (
        <Modal isOpen={filterComp} className="filter-modal">
          <ModalBody>
            <Row>
              <Col className="col-10">
                <div className="filter-text">Filters</div>
              </Col>
              <Col className="col-2">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  onClick={() => showFilterComp(false)}
                  size={"1x"}
                />
              </Col>
            </Row>
            <hr className="hr"></hr>
            <div className="filter-box">
              <Row>
                <Col className="col-3">
                  <div className="filter-text2">Type</div>
                </Col>
                <Col className="col-1">
                  <div className="vr"></div>
                </Col>
                <Col className="col-5">(Normal + 5 More)</Col>

                <Col className="col-3">
                  <FontAwesomeIcon
                    icon={checkBox ? faPlusCircle : faMinusCircle}
                    size={"1x"}
                    onClick={() => showCheckBox(!checkBox)}
                  />
                </Col>
              </Row>

              <div style={{ display: checkBox ? "none" : "block" }}>
                <hr
                  className="hr"
                  style={{ margin: "0 5px 0 5px", width: "98%" }}
                ></hr>
                <Row className="checkBoxRow">
                  {Object.entries(TYPE_OPTIONS).map(([key, value]) => (
                    <Col key={key} className="col-6 checkBox">
                      <label key={key} style={{ marginRight: "10px" }}>
                        <input type="checkbox" value={value} />
                        {value}
                      </label>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <div className="filter-box">
              <Row>
                <Col className="col-3">
                  <div className="filter-text2">Gender</div>
                </Col>
                <Col className="col-1">
                  <div className="vr"></div>
                </Col>
                <Col className="col-5">(Male + 2 More)</Col>

                <Col className="col-3">
                  <FontAwesomeIcon
                    icon={radioButton ? faPlusCircle : faMinusCircle}
                    size={"1x"}
                    onClick={() => showRadioButton(!radioButton)}
                  />
                </Col>
              </Row>
              <div style={{ display: radioButton ? "none" : "block" }}>
                <hr
                  className="hr"
                  style={{ margin: "0 5px 0 5px", width: "98%" }}
                ></hr>
                <Row className="checkBoxRow">
                  {Object.entries(GENDER_OPTIONS).map(([key, value]) => (
                    <Col key={key} className="col-4 checkBox">
                      <label key={key} style={{ marginRight: "10px" }}>
                        <input type="radio" value={value} />
                        {value}
                      </label>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
            <div className="filter-box">
              <Row>
                <Col className="col-3">
                  <div className="filter-text2">Stats</div>
                </Col>
                <Col className="col-1">
                  <div className="vr"></div>
                </Col>
                <Col className="col-5">(HP + 5 More)</Col>

                <Col className="col-3">
                  <FontAwesomeIcon
                    icon={progressBar ? faPlusCircle : faMinusCircle}
                    size={"1x"}
                    onClick={() => showProgressBar(!progressBar)}
                  />
                </Col>
              </Row>
              <div style={{ display: progressBar ? "none" : "block" }}>
                <hr
                  className="hr"
                  style={{ margin: "0 5px 0 5px", width: "98%" }}
                ></hr>
                <Row className="checkBoxRow">
                  {Object.entries(STATS_OPTIONS).map(([key, value]) => (
                    <Col key={key} className="col-12 checkBox">
                      <Progress value={50} min={minValue} max={maxValue}>
                        {120}
                      </Progress>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Row className="footer">
              <Col className="col-6">
                <Button className="btn-primary" color="#2E3156">
                  Reset
                </Button>
              </Col>
              <Col className="col-6">
                <Button className="btn-outline-primary" color="#2E3156">
                  Apply
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

Filter.propTypes = {
  filterComp: PropTypes.bool,
  showFilterComp: PropTypes.func,
};

Filter.defaultProps = {
  showFilterComp: () => {},
  filterComp: false,
};

export default Filter;
