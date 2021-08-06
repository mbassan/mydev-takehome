import React from "react";
import moment from "moment";
import Button from "ui/components/Button";
import Icon from "ui/components/Icon";
import List from "ui/components/List";
import Modal from "ui/components/Modal";
import PeopleRelationships from "containers/PeopleRelationships";
import { GlobalStateContext } from "context/GlobalContext";
import { NotificationsContext } from "context/NotificationsContext";
import actions from "context/actions/globalActions";
import request from "ui/utilities/request";
import { dateFormat } from "ui/utilities/constants";
import styles from "./People.module.css";

export default function People() {
  const { dispatch } = React.useContext(GlobalStateContext);
  const { addNotification } = React.useContext(NotificationsContext);
  const [showModal, setShowModal] = React.useState(false);
  const [people, setPeople] = React.useState({ docs: [], totalPages: 1 });
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(30);
  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState(null);
  const [person, setPerson] = React.useState({});
  const [films, setFilms] = React.useState([]);
  const [species, setSpecies] = React.useState([]);

  async function view(person) {
    try {
      dispatch({ type: actions.SET_LOADING, payload: true });
      const result = await Promise.all([
        request("get", `/people/${person._id}/films`, {}),
        request("get", `/people/${person._id}/species`, {}),
      ]);
      setFilms(result[0].data);
      setSpecies(result[1].data);
      dispatch({ type: actions.SET_LOADING, payload: false });
    } catch (error) {
      addNotification({
        text: "There was an error while loading species/films for this person.",
      });
      dispatch({ type: actions.SET_LOADING, payload: false });
    }
    setPerson(person);
    setId(person._id);
    setTitle(person.name);
    setShowModal(true);
  }

  const loadData = React.useCallback(
    async (p, perP) => {
      try {
        dispatch({ type: actions.SET_LOADING, payload: true });
        const result = await request("get", `/people`, {
          page: p || page,
          perPage: perP || perPage,
        });
        if (!result.data) {
          throw new Error(result);
        }
        if (p) {
          setPage(p);
        }
        if (perP) {
          setPerPage(perP);
        }
        setPeople(result.data);
        dispatch({ type: actions.SET_LOADING, payload: false });
      } catch (error) {
        addNotification({ text: "There was an error while people." });
        dispatch({ type: actions.SET_LOADING, payload: false });
      }
    },
    [dispatch, page, perPage, addNotification]
  );

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <List
        className={styles.table}
        title="People"
        listItems={people.docs}
        emptyMessage="No people found yet."
        cols={[
          {
            name: "name",
            label: "Task",
            render: (row) => <b>{row.name}</b>,
          },
          {
            name: "eye_color",
            label: "Eye Color",
          },
          {
            name: "gender",
            label: "Gender",
          },
          {
            name: "skin_color",
            label: "Skin Color",
          },
          {
            name: "hair_color",
            label: "Hair Color",
          },
          {
            name: "height",
            label: "Height",
          },
          {
            name: "mass",
            label: "Mass",
          },
          {
            name: "films",
            label: "Films Found",
            render: (row) => (row?.films ? row.films.length : 0),
          },
          {
            name: "species",
            label: "Species Found",
            render: (row) => (row?.species ? row.species.length : 0),
          },
          {
            name: "updatedAt",
            label: "Updated",
            render: (row) => moment(row.updatedAt).format(dateFormat.date),
          },
          {
            name: "buttons",
            align: "right",
            label: "",
            render: (stream) => (
              <div className={styles.rowButtons}>
                <Button
                  iconButton
                  variant="secondary"
                  onClick={() => view(stream)}
                >
                  <Icon variant="action" type="view" />
                </Button>
              </div>
            ),
          },
        ]}
        page={page}
        totalPages={people.totalPages}
        setPage={loadData}
      />
      <Modal
        show={showModal}
        size="large"
        caption={title}
        buttons={[
          <Button
            variant="primary"
            size="medium"
            onClick={() => setShowModal(false)}
            key={1}
          >
            <Icon variant="primary" type="times" />
            Close
          </Button>,
        ]}
        close={() => setShowModal(false)}
      >
        <PeopleRelationships person={person} films={films} species={species} />
      </Modal>
    </>
  );
}
