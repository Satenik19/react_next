import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { showToast } from '../../services/toast';
import { ADD_POST_REQUEST, UPDATE_POST_REQUEST } from '../../redux/post/actions';

function New({ selectedPost }) {
    const {
        addPostSuccess, addPostError, updatePostError, updatePostSuccess,
    } = useSelector((state) => state.postsData);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const ref = useRef();

    useEffect(() => {
        if (addPostSuccess || updatePostSuccess) {
            showToast('success', `Post has been ${updatePostSuccess ? 'updated' : 'added'} successfully`);
            ref.current.click();
            resetData();
        }
    }, [addPostSuccess, updatePostSuccess]);

    useEffect(() => {
        if (addPostError || updatePostError) {
            showToast('error', 'Something went wrong');
        }
    }, [addPostError, updatePostError]);

    useEffect(() => {
        if (selectedPost._id) {
            setTitle(selectedPost.title);
            setDescription(selectedPost.description);
        }
    }, [selectedPost]);

    const submitPost = (e) => {
        e.preventDefault();
        if (selectedPost._id) {
            dispatch({
                type: UPDATE_POST_REQUEST,
                payload: {
                    ...selectedPost,
                    title,
                    description,
                },
            });
        } else {
            dispatch({
                type: ADD_POST_REQUEST,
                payload: {
                    title,
                    description,
                },
            });
        }
    };

    const resetData = () => {
        setTitle('');
        setDescription('');
    };

    return (
      <div className="my-2">
        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#posts-modal">
          Add new post
        </button>
        <div
          className="modal fade"
          id="posts-modal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{ selectedPost._id ? 'Edit post' : 'New post' }</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title || ''}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <input
                      type="text"
                      className="form-control"
                      value={description || ''}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  ref={ref}
                  onClick={resetData}
                >Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => submitPost(e)}
                >Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

New.propTypes = {
    selectedPost: PropTypes.object,
};

export default New;
