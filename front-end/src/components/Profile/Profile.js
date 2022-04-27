const Profile = ({ user }) => {
  return (
    <div>
      {user.firstName} {user.lastName}
    </div>
  );
};

export default Profile;
