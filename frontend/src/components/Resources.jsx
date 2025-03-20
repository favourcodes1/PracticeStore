import React, { useState } from "react";
import "../styles/Resources.css";
import { Button } from "react-bootstrap";
import { CustomModal } from "./Modal";
import Form from "react-bootstrap/Form";
import Loader from "./Loader";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getResources,
  createResource,
  deleteResource,
  updateResource,
} from "../fetchFunctions/fetchResources";

export function Resources() {
  const { isLoading, error, data } = useQuery(["resources"], getResources);
  const queryClient = useQueryClient();
  const [newResourceTitle, setNewResourceTitle] = useState();
  const [showCreateModal, setShowCreateModal] = useState();
  const [updatedTitle, setUpdatedTitle] = useState();
  const [showUpdateModal, setShowUpdateModal] = useState();
  const [resourceIdToUpdate, setResourceIdToUpdate] = useState();

  const addResourceMutation = useMutation(
    (newResource) => createResource(newResource),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("resources");
      },
    }
  );

  const deleteResourceMutation = useMutation(
    (resourceId) => deleteResource(resourceId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("resources");
      },
    }
  );

  const updateResourceMutation = useMutation(
    ({ id, title }) => updateResource(id, title),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("resources");
      },
    }
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return <h1>Something went wrong when fetching resources!</h1>;
  }

  const handleModalShowCreate = () => setShowCreateModal(true);
  const handleModalCloseCreate = () => setShowCreateModal(false);

  const handleModalShowUpdate = () => setShowUpdateModal(true);
  const handleModalCloseUpdate = () => setShowUpdateModal(false);

  return (
    <>
      <div className="edit-resource-btn-wrapper">
        <Button onClick={handleModalShowCreate} className="add-btn-resources">
          ADD NEW RESOURCE
        </Button>
      </div>
      <CustomModal
        show={showCreateModal}
        handleClose={handleModalCloseCreate}
        title="Add new Resource"
        handleSave={() => {
          addResourceMutation.mutate({
            title: newResourceTitle,
          });
          handleModalCloseCreate();
        }}
      >
        <Form.Control
          onChange={(event) => setNewResourceTitle(event.target.value)}
          size="lg"
          type="text"
          placeholder="title"
        />
      </CustomModal>
      <CustomModal
        show={showUpdateModal}
        handleClose={handleModalCloseUpdate}
        title="Edit Resource"
        handleSave={() => {
          console.log("aici", updatedTitle);
          updateResourceMutation.mutate({
            id: resourceIdToUpdate,
            title: updatedTitle,
          });

          handleModalCloseUpdate();
        }}
      >
        <Form.Control
          onChange={(event) => setUpdatedTitle(event.target.value)}
          size="lg"
          type="text"
          placeholder="title"
        />
      </CustomModal>
      <ol>
        {data.data.resources.map((resource) => (
          <div key={resource._id} className="resource-item-wrapper">
            <li>
              <h3>{resource.title}</h3>
            </li>
            <div className="buttons-group">
              <Button
                onClick={() => {
                  setUpdatedTitle(resource.title);
                  setResourceIdToUpdate(resource._id);
                  handleModalShowUpdate();
                }}
              >
                EDIT
              </Button>
              <Button
                onClick={() => deleteResourceMutation.mutate(resource._id)}
                variant="danger"
              >
                DELETE
              </Button>
            </div>
          </div>
        ))}
      </ol>
    </>
  );
}
