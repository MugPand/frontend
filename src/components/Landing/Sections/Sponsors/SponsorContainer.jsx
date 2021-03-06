import React, { Component } from "react";
import { theme } from "../../../../Defaults.js";
import SponsorItem from "./SponsorItem.jsx";
import { Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";


const sponsor_colors = {
};

class SponsorContainer extends Component {
    render() {
        let { declaration } = this.props;
        let sponsors = [];
        for (let i = 0; i < declaration.children.length; i++) {
            sponsors.push(<SponsorItem key={i}
                type={declaration.name}
                color={theme[declaration.color]}
                size={declaration.size}
                baseURL={this.props.baseURL}
                image={`${declaration.root}${declaration.children[i].image}`}
                href={declaration.children[i].url}
                name={declaration.children[i].name} />);
        }
        return (
            <Container fluid
                maxWidth={false}
                style={{ textAlign: "center" }}>
                { this.props.showName &&
                    <Grid style={{ width: "100%" }}
                        className="d-flex align-items-center">
                        <Grid xs={12}>
                            <h2 className="display-4"
                                style={{ color: theme[declaration.color] }}>
                                {declaration.name}
                            </h2>
                        </Grid>
                    </Grid>}
                <Grid className="d-flex justify-content-center flex-wrap"
                    style={{ backgroundColor: sponsor_colors[declaration.name] ? sponsor_colors[declaration.name] : "white" }}>
                    {sponsors}
                </Grid>
            </Container>
        );
    }
}

SponsorContainer.propTypes = {
    declaration: PropTypes.object,
    baseURL: PropTypes.string,
    showName: PropTypes.bool
};

export default SponsorContainer;