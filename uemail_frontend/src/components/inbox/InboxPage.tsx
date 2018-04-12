import React from 'react';

interface InboxPageProps {
}

const InboxPage: React.SFC<InboxPageProps> = (props: InboxPageProps) => {
  return (
    <div className="container">
      <link rel='stylesheet prefetch'
            href='http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css' />
      <div className="mail-box">
        <aside className="lg-side">
          <div className="inbox-body">
            <div className="mail-option">
              <div className="chk-all">
                <input type="checkbox" className="mail-checkbox mail-group-checkbox" />
                <div className="btn-group">
                  <a data-toggle="dropdown" href="#" className="btn mini all" aria-expanded="false">
                    All <i className="fa fa-angle-down" />
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#"> None</a></li>
                    <li><a href="#"> Read</a></li>
                    <li><a href="#"> Unread</a></li>
                  </ul>
                </div>
              </div>
              <div className="btn-group">
                <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="#"
                   className="btn mini tooltips">
                  <i className="fa fa-refresh" />
                </a>
              </div>
              <div className="btn-group hidden-phone">
                <a data-toggle="dropdown" href="#" className="btn mini blue" aria-expanded="false">
                  More
                  <i className="fa fa-angle-down " />
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#"><i className="fa fa-pencil" /> Mark as Read</a></li>
                  <li><a href="#"><i className="fa fa-ban" /> Spam</a></li>
                  <li className="divider" />
                  <li><a href="#"><i className="fa fa-trash-o" /> Delete</a></li>
                </ul>
              </div>
              <div className="btn-group">
                <a data-toggle="dropdown" href="#" className="btn mini blue">
                  Move to
                  <i className="fa fa-angle-down " />
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#"><i className="fa fa-pencil" /> Mark as Read</a></li>
                  <li><a href="#"><i className="fa fa-ban" /> Spam</a></li>
                  <li className="divider" />
                  <li><a href="#"><i className="fa fa-trash-o" /> Delete</a></li>
                </ul>
              </div>

              <ul className="unstyled inbox-pagination">
                <li><span>1-50 of 234</span></li>
                <li>
                  <a className="np-btn" href="#"><i className="fa fa-angle-left  pagination-left" /></a>
                </li>
                <li>
                  <a className="np-btn" href="#"><i className="fa fa-angle-right pagination-right" /></a>
                </li>
              </ul>
            </div>
            <table className="table table-inbox table-hover">
              <tbody>
              <tr className="unread">
                <td className="inbox-small-cells">
                  <input type="checkbox" className="mail-checkbox" />
                </td>
                <td className="view-message dont-show">PHPClass</td>
                <td className="view-message">Added a new className: Login Class Fast Site</td>
                <td className="view-message inbox-small-cells"><i className="fa fa-paperclip" /></td>
                <td className="view-message text-right">9:27 AM</td>
              </tr>
              <tr className="unread">
                <td className="inbox-small-cells">
                  <input type="checkbox" className="mail-checkbox" />
                </td>
                <td className="view-message dont-show">Google Webmaster</td>
                <td className="view-message">Improve the search presence of WebSite</td>
                <td className="view-message inbox-small-cells" />
                <td className="view-message text-right">March 15</td>
              </tr>
              </tbody>
            </table>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default InboxPage;
