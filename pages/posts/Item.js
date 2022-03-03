import React, { memo } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

function Item({
 post, deleteItem, setSelectedPost, index,
}) {
    return (
      <div className="card post-item">
        <h5 className="card-header">
          {post.title}
        </h5>
        <div className="card-body d-flex justify-content-between">
          <p className="card-text">{post.description}</p>
          <div>
            <button
              type="button"
              className="btn btn-primary mr-2"
              onClick={() => {
                  setSelectedPost({ ...post, index });
              }}
              data-toggle="modal"
              data-target="#posts-modal"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteItem(post._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
}

Item.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }),
    index: PropTypes.number,
    deleteItem: PropTypes.func,
    setSelectedPost: PropTypes.func,
};

export default memo(Item);
