import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={s.listContact}>
      {contacts.map(contact => (
        <li className={s.listItem} key={contact.id}>
          {contact.name + ':' + contact.number}

          <button
            className={s.listButton}
            type="button"
            onClick={() => deleteContact(contact.id)}
          >
            {/* () => onDeleteHandler(contact.id) */}
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  deleteContact: PropTypes.func,
  // Of(
  //   PropTypes.shape({
  //     id: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     number: PropTypes.string.isRequired,
  //   })
  // ),
};

export default ContactList;
