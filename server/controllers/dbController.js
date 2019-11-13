const db = require('../models/models.js');

const dbController = {};

dbController.createUser = (req, res, next) => {
    const { username, password } = req.body;
    const queryStr = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
	`;

  db.query(queryStr, [username, password])
	.then( data => {
	  res.locals.user = { username };
	  return next();
	})
    .catch( err => {
	  console.log('Error saving user: ', err);
	  return next({ error: err });
	});

  // db currently does not save two accounts with the same username, but does not notify second user that username is already taken
  /*
    db.query(queryStr, [username, password], (err, data) => {
        if (err) {
            return next({
                log: `dbController.createUser: ERROR: ${err}`,
                message: { err: 'Error occurred in dbController.createUser.' }
            });
        }
	})
	*/

    

}

dbController.verifyUsername = (req, res, next) => {
    const {username} = req.body;
    const queryStr = `
    SELECT (username) FROM users
    WHERE username = $1
    `;
    console.log('This is username', username)
    const values = [username]

    db.query(queryStr,values)
      .then(data => {
          if(data.rows.length === 0) {
              res.status(404).json({nouser : 'no user found'});
              return next();
          } 
        // Save user to locals  
        res.locals.username = data.rows[0].username;
        return next()
        })
      .catch(err => {
          console.log('Error in verifyUser.controller', err)
          return next();
        })
}

dbController.addVenue = async (req, res, next) => {
    const { venueId, venueName } = req.body;
    try {
        const queryStr = `
        INSERT INTO Venues (venue_id, venue)
        VALUES ($1, $2)
        ON CONFLICT (venue_id)
        DO NOTHING
        `;
        // const params = [ req.body.venueId, req.body.venueName ];
        const result = await db.query(queryStr, [ venueId, venueName ]);
        return next();
    }
    catch (err) {
        next({
            log: `dbController.addVenue: ERROR: ${err}`,
            message: { err: 'Error occurred in dbController.addVenue.' }
        });
    }
}

// issue with duplicate unique primary key for venue; does adding a findVenue method or joining tables help fix this?

dbController.addWaitTime = (req, res, next) => {
    const { waitTime, venueId } = req.body;

    // later, add a third column for createdby username
    const queryStr = `
        INSERT INTO wait_times (wait_time, venue_id)
        VALUES ($1, $2)
        RETURNING *
        `;

    db.query(queryStr, [ waitTime, venueId ], (err, data) => {
        if (err) {
            return next({
                log: `dbController.addWaitTime: ERROR: ${err}`,
                message: { err: 'Error occurred in dbController.addWaitTime.' }
            });
        }
        res.locals.results = data;
        // console.log(res.locals.results);
        return next();
    })

    // need to add async before (req, resp, next) if doing below method
    // try {
    //     const queryStr = `
    //     INSERT INTO WaitTimes (WaitTime, VenueID)
    //     VALUES ($1, $2)
    //     RETURNING *
    //     `;
    //     const params = [ waitTime, venueId ];
    //     const result = await db.query(queryStr, params);
    //     res.locals.results = result.rows[0];
    //     console.log(res.locals.results);
    //     return next();
    // }
    // catch (err) {
    //     next({
    //         log: `dbController.addWaitTime: ERROR: ${err}`,
    //         message: { err: 'Error occurred in dbController.addWaitTime.' }
    //     });
    // }
}

dbController.getWaitTimes = async (req, res, next) => {
  const { venueId } = req.body;
  try {
      const queryStr = `
      SELECT wait_time, timestamp
      FROM wait_times
      WHERE venue_id='${venue_id}'
      ORDER BY timestamp DESC
      LIMIT 10
      `;
      const result = await db.query(queryStr);
      res.locals.results = result.rows;
      return next();
  }
  catch (err) {
      next({
          log: `dbController.getWaitTimes: ERROR: ${err}`,
          message: { err: 'Error occurred in dbController.getWaitTimes.' }
      });
  }
}

dbController.addFavorite = async (req, res, next) => {
    const { venue_id } = req.params;
    console.log(venue_id);
    let user;
    const cookie = req.cookies.ssid;
    const queryStr = `
    SELECT user_id FROM sessions 
    WHERE cookieid = $1`

    await db.query(queryStr, [cookie])
      .then(data => {
          user = data.rows[0].user_id;
      })
    .catch(err => next(err));
    
    const insertStr = `
    INSERT INTO favorites (user_id, venue_id)
    VALUES ($1,$2)`

    db.query(insertStr, [user, venue_id.toString()])
      .then(data => {
          return next();
      })
      .catch(err => next(err));
}

module.exports = dbController;


