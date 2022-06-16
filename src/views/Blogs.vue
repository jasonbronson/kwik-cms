<template>
  <div>
    <div class="main">
      <!-- <div class="left">
        <ul>
          <li class="menu-heading">Dashboards</li>
          <li>
            <a data-toggle="tab" href="#overview"
              ><i class="fa fa-home fa-lg"></i> Overview</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#performance"
              ><i class="fa fa-tachometer fa-lg"></i> Performance</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#analytics"
              ><i class="fa fa-line-chart fa-lg"></i> Analytics</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#landing"
              ><i class="fa fa-rocket fa-lg"></i> Landing</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#projects"
              ><i class="fa fa-table fa-lg"></i> Projects</a
            >
          </li>
          <li class="menu-heading">Pages</li>
          <li class="active">
            <a data-toggle="tab" href="#user-profile"
              ><i class="fa fa-street-view fa-lg"></i> User Profile</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#candidates"
              ><i class="fa fa-users fa-lg"></i> Candidates</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#invoices"
              ><i class="fa fa-files-o fa-lg"></i> Invoices</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#single-invoice"
              ><i class="fa fa-file-text-o fa-lg"></i> Single Invoice</a
            >
          </li>
          <li>
            <a data-toggle="tab" href="#browse"
              ><i class="fa fa-search fa-lg"></i> Browse</a
            >
          </li>
        </ul>
      </div> -->
      <!-- <div class="right">
        <div class="tab-content">
          <div id="overview" class="tab-pane fade">
            <div class="header">
              <h4>Account</h4>
            </div>
            <div class="content"></div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Roboto:300&display=swap");

/* Styles */
body {
  background: "#efefed";
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
}

.text-red {
  color: "#61b4c6" !important;
}
.text-green {
  color: "#52b173" !important;
}
.text-orange {
  color: "#d0a03b" !important;
}
.text-blue {
  color: "#647373" !important;
}

/* buttons */
.btn-red {
  background: "#61b4c6";
  color: "#efefed";
  font-size: xx-small;
  &:hover,
  &:focus {
    background: darken(#61b4c6, 8%);
    color: white;
  }
}
.btn-grayblue {
  background: lighten(#7f8fa4, 15%);
  color: "#efefed";
  font-size: xx-small;
  &:hover,
  &:focus {
    background: lighten(#7f8fa4, 8%);
    color: white;
  }
}

/* Custom scrollbar */
.main {
  // width
  ::-webkit-scrollbar {
    width: 5px;
  }
  // Track
  ::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  // Handle
  ::-webkit-scrollbar-thumb {
    background: lighten(#354052, 20%);
    border-radius: 10px;
  }
  // Handle on hover
  ::-webkit-scrollbar-thumb:hover {
    background: lighten(#354052, 10%);
  }
}
/* Left Menu */
.left {
  width: 57px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  // background: lighten($black, 35%);
  background: #354052;
  position: fixed;
  transition: all 0.5s;
  &:hover {
    width: 200px;
    ul li.menu-heading {
      opacity: 1;
    }
  }
  ul {
    padding-left: 0;
    li {
      list-style-type: none;
      &.active a {
        background: lighten(#52b173, 10%);
        color: "#efefed";
        &:hover {
          background: lighten(#52b173, 5%);
        }
      }
      a {
        display: flex;
        align-items: center;
        // background: lighten($black, 35%);
        background: "#354052";
        color: "#efefed";
        padding: 15px 10px;
        font-size: 13px;
        width: 200px;
        border-bottom: 1px solid darken(#354052, 5%);
        &:hover {
          // background: $black;
          background: darken(#354052, 5%);
          text-decoration: none;
          i.fa {
            color: lighten(#52b173, 10%);
          }
        }
        &:focus {
          text-decoration: none;
        }
        i.fa {
          width: 50px;
          text-align: center;
          padding-right: 15px;
          transition: all 1s;
        }
      }
    }
    .menu-heading {
      opacity: 0;
      padding: 10px 5px 10px 10px;
      color: darken(yellow, 15%);
      font-size: smaller;
      border-bottom: 1px solid darken(#354052, 5%);
      transition: all 0.5s;
    }
  }
}
/* Right Content */
.right {
  transition: all 0.5s;
  margin-left: 72px;
  /* Overview */
  #overview {
    .header {
      background: "#efefed";
      display: block;
      border: 1px solid lighten(#efefed, 90%);
      padding: 15px 30px;
      margin-left: -15px;
      h4 {
        display: inline-block;
        color: "#354052";
      }
      ul {
        right: 0;
        left: inherit;
        max-width: 350px;
        li {
          display: inline-block;
          padding-left: 20px;
          .btn-group {
            i.fa-user-o,
            i.fa-bell-o {
              color: lighten(#efefed, 70%);
              font-size: 24px;
              cursor: pointer;
              &:nth-child(1):after {
                content: "3";
                background: "#d0a03b";
                color: "#efefed";
                font-size: small;
                padding: 4px 7px;
                border-radius: 50%;
                position: absolute;
                top: -8px;
                left: 10px;
              }
            }
            i.fa-angle-down {
              cursor: pointer;
            }
            .dropdown-menu {
              padding: 0;
              li {
                padding-left: 0;
                display: block;
                border-bottom: 1px solid lighten(black, 90%);
                &:nth-child(1) .alert-card i.fa {
                  color: lighten(#52b173, 10%);
                }
                &:nth-child(2) .alert-card i.fa {
                  color: lighten(purple, 10%);
                }
                &:nth-child(3) .alert-card i.fa {
                  color: "#354052";
                }
                &:last-child {
                  border-bottom: none;
                }
                a {
                  padding-top: 10px;
                  padding-bottom: 10px;
                  &:hover {
                    background: lighten(#354052, 65%);
                  }
                  .alert-card {
                    display: flex;
                    img,
                    i.fa {
                      height: 40px;
                      margin-right: 15px;
                    }
                    p {
                      color: "#354052";
                      margin-bottom: 0;
                      small {
                        color: "#7f8fa4";
                        width: 100%;
                        white-space: pre-line;
                      }
                    }
                  }
                }
              }
            }
          }
          .dropdown-avatar {
            img {
              height: 35px;
            }
            i.fa {
              padding-left: 8px;
            }
          }
        }
      }
    }
    .content {
      padding: 0 30px 15px 15px;
      .row.graph-cards {
        margin-top: 20px;
        .col-sm-4 {
          // &:first-child div{margin-left: -15px;}
          // &:last-child div{margin-right: -15px;}
          div {
            background: "#efefed";
            padding: 15px;
            h4,
            h2 {
              color: "#354052" small {
                color: "#7f8fa4";
                font-size: small;
              }
            }
            h2 {
              line-height: 85%;
            }
            img {
              width: 100%;
              height: 150px;
              object-fit: contain;
            }
          }
          &:last-child {
            img {
              height: 220px;
            }
          }
        }
      }
      .row.project-cards {
        margin-top: 20px;
        .col-sm-3 {
          .card {
            background: "#efefed";
            padding: 0;
            img {
              width: 100%;
            }
            h5 {
              padding: 15px 30px;
              border-bottom: 1px solid lighten(black, 90%);
            }
            .row {
              padding: 0 15px;
              margin-left: 0;
              margin-right: 0;
              .col-sm-6 {
                // margin: 0;
                padding: 15px;
              }
            }
          }
        }
      }
      .row.invoice-task {
        margin-top: 20px;
        .col-sm-6 {
          .invoice,
          .tasks {
            background: "#efefed";
            h5 {
              color: black;
              padding: 15px;
              small {
                a {
                  color: "#7f8fa4";
                  font-size: xs-small;
                  margin-top: 5px;
                  display: block;
                }
              }
            }
            .table {
              tbody {
                tr {
                  td {
                    font-size: small;
                    border-top-color: lighten(black, 90%);
                    padding: 15px;
                  }
                }
              }
            }
          }
          .invoice {
            .table {
              tbody {
                tr {
                  td {
                    &:nth-child(1),
                    &:nth-child(3) {
                      color: "#7f8fa4";
                    }
                    &:nth-child(4) {
                      .btn {
                        font-size: xx-small;
                      }
                    }
                    &:nth-child(1),
                    &:nth-child(2),
                    &:nth-child(3),
                    &:nth-child(5) {
                      padding-top: 20px;
                    }
                    .checkbox {
                      margin: 5px 0 0;
                    }
                  }
                }
              }
            }
          }
          .tasks {
            .table {
              tbody {
                tr {
                  td {
                    .checkbox {
                      margin: 5px 0 0 0;
                      &:hover {
                        label {
                          text-decoration: line-through;
                          color: lighten(black, 60%);
                          input {
                            opacity: 0.5;
                          }
                        }
                      }
                      label {
                        input {
                          margin-top: 2px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.left:hover + .right {
  margin-left: 215px;
}
</style>
