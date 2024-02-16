import EmailBody from './EmailBody';

const Folders =() => {
const emailArray = [];

  return (
    <div className="email-list">
      {emailArray.map((email) => (
        <EmailBody
          key={email.id}
          from={email.to}
          subject={email.subject}
          msg={email.msg}
          timeStamp={new Date(email.timeStamp).toLocaleString()}
        />
      ))}
    </div>
  );
};
export default Folders;