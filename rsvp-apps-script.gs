/**
 * Wedding RSVP → Google Sheets (free)
 *
 * SETUP (script.google.com → New project — skip Extensions menu if it errors):
 *
 * 1. Sheet headers row 1:
 *    Timestamp | Name | Thursday Attending | Thursday Guests | Saturday Attending | Saturday Guests
 * 2. Sheet URL → copy ID between /d/ and /edit
 * 3. Paste this file, set SHEET_ID below, Save
 * 4. Run testWrite once from the toolbar (select testWrite → Run)
 *    → approve permissions when asked
 * 5. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone          ← MUST be Anyone (not "Anyone with Google account")
 * 6. After deploy, open the /exec URL in an incognito window.
 *    You must see: "Wedding RSVP endpoint is live..."
 *    If you see a Google login page, access is wrong — redeploy.
 * 7. Put /exec URL in .env → VITE_GOOGLE_SCRIPT_URL → restart npm run dev
 *
 * After ANY code change: Deploy → Manage deployments → ✎ Edit → New version → Deploy
 */

var SHEET_ID = 'YOUR_SHEET_ID' // ← replace with your Sheet ID

function getSheet_() {
  if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID') {
    throw new Error('Set SHEET_ID in the Apps Script before deploying')
  }
  var ss = SpreadsheetApp.openById(SHEET_ID)
  return ss.getSheetByName('RSVPs') || ss.getSheets()[0]
}

/** Run this once from the Apps Script editor to authorize + verify the Sheet link */
function testWrite() {
  var sheet = getSheet_()
  sheet.appendRow([
    new Date(),
    'TEST — delete me',
    'Yes',
    1,
    'No',
    0,
  ])
}

function doPost(e) {
  try {
    var sheet = getSheet_()
    var params = (e && e.parameter) || {}

    // Also accept JSON body (text/plain) from the website
    if (e && e.postData && e.postData.contents) {
      try {
        var json = JSON.parse(e.postData.contents)
        params = {
          name: json.name,
          thursday_attending: json.thursday_attending,
          thursday_guests: json.thursday_guests,
          saturday_attending: json.saturday_attending,
          saturday_guests: json.saturday_guests,
        }
      } catch (ignore) {
        // keep form params
      }
    }

    var name = String(params.name || '').trim()
    var thursdayAttending = String(params.thursday_attending || 'No').trim()
    var thursdayGuests = String(params.thursday_guests || '0').trim()
    var saturdayAttending = String(params.saturday_attending || 'No').trim()
    var saturdayGuests = String(params.saturday_guests || '0').trim()

    if (!name) {
      return jsonOut_({ result: 'error', message: 'Missing name' })
    }

    if (thursdayAttending !== 'Yes' && saturdayAttending !== 'Yes') {
      return jsonOut_({ result: 'error', message: 'No occasion selected' })
    }

    sheet.appendRow([
      new Date(),
      name,
      thursdayAttending,
      Number(thursdayGuests) || 0,
      saturdayAttending,
      Number(saturdayGuests) || 0,
    ])

    return jsonOut_({ result: 'success' })
  } catch (err) {
    return jsonOut_({ result: 'error', message: String(err) })
  }
}

function doGet() {
  return ContentService.createTextOutput(
    'Wedding RSVP endpoint is live. Use POST from the invitation form.',
  )
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
