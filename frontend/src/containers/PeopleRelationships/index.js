import React from "react";
import PropTypes from "prop-types";
import Card from "ui/components/Card";
import styles from "./PeopleRelationships.module.css";

export default function PeopleRelationships({ person, films, species }) {
  return (
    <div className={styles.container}>
      <h3>Relationships for {person.name}</h3>
      <div className={styles.split}>
        <div>
          <h3>Films</h3>
          {films.map((film) => (
            <Card>
              <h4>{film.title}</h4>
              <div className={styles.line}>
                <b>Released:</b> {film.release_date}
              </div>
              <div className={styles.line}>
                <b>Episode ID:</b> {film.episode_id}
              </div>
              <div className={styles.line}>
                <b>Producer:</b> {film.producer}
              </div>
              <div className={styles.desc}>{film.opening_crawl}</div>
            </Card>
          ))}
        </div>
        <div>
          <h3>Species</h3>
          {species.map((species) => (
            <Card>
              <h4>{species.name}</h4>
              <div className={styles.line}>
                <b>Average Height:</b> {species.average_height}
              </div>
              <div className={styles.line}>
                <b>Average Lifespan:</b> {species.average_lifespan}
              </div>
              <div className={styles.line}>
                <b>Classification:</b> {species.classification}
              </div>
              <div className={styles.line}>
                <b>Designation:</b> {species.designation}
              </div>
              <div className={styles.desc}>{species.opening_crawl}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

PeopleRelationships.defaultProps = {
  person: {},
  films: [],
  species: [],
};

PeopleRelationships.propTypes = {
  person: PropTypes.object,
  films: PropTypes.arrayOf(PropTypes.object),
  species: PropTypes.arrayOf(PropTypes.object),
};
