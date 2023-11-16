// Learn more about destination functions API at
// https://segment.com/docs/connections/destinations/destination-functions

/**
 * Handle track event
 * @param  {SegmentTrackEvent} event
 * @param  {FunctionSettings} settings
 */
async function onTrack(event, settings) {
	const { userId } = event.userId;
	const messageId = event.event; // e.g., 'SpendingTrendSummary'

	if (!userId || !messageId) return;

	try {
		const traits = await fetchProfile(userId).traits; // Fetch traits

		const { DPID } = traits;

		if (!DPID) throw new RetryError('DPID required to send message');

		const messagingEndpoint = `https://cogbill-demo-4919.twil.io/sms`;

		const body = assemblePayload(messageId, DPID, fetchedProfile)

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// Authorization: `Basic ${Buffer.from(`${settings.accessToken}:`).toString(
				// 	'base64'
				// )}`
			},
			body
		};

		// Make API call to JPMC Messaging
		await fetch(messagingEndpoint, options).then((result, error) => {
			if (error) {
				console.log(error);
				throw new RetryError(error.message);
			}
			console.log('successfully sent Message');
		});
	} catch (error) {
		// Retry on connection error
		throw new RetryError(error.message);
	}

	if (response.status >= 500 || response.status === 429) {
		// Retry on 5xx (server errors) and 429s (rate limits)
		throw new RetryError(`Failed with ${response.status}`);
	}

	// Learn more at https://segment.com/docs/connections/spec/track/
}

function assemblePayload(messageId, DPID, traits) {
	let payload;
	switch (messageId) {
		case 'TransactionSplit':
			const {
				payment_split_eligible_transaction_merchant_names_last_3_days: merchantArray,
				payment_split_eligible_transaction_amounts_last_3_days: amountArray,
			} = traits

			const {merchant, amount} = getBestTransaction(merchantArray, amountArray)

			payload = {merchant, amount}
			break
		case 'BudgetGoalActivate':
			const {
				monthly_spend_increase: increaseAmount,
			} = traits

			payload = {increaseAmount}
			break
		default:
			payload = {traits}

	}
	return JSON.stringify(
			Object.assign({ messageId, DPID }, payload)
		);
}

function getBestTransaction(merchantArray, amountArray) {
	// this could also be prioritized to highest amount, for instance
	return {merchant: merchantArray[0], amount: amountArray[0]}
}

async function fetchProfile(userId) {
	let response;

	try {
		const endpoint = `https://profiles.segment.com/v1/spaces/${settings.spaceId}/collections/users/profiles/user_id:${userId}/traits?limit=200`;


		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				// NOTE the `:` after the Token in the below
				Authorization: `Basic ${Buffer.from(`${settings.accessToken}:`).toString(
					'base64'
				)}`
			}
		};

		const response = await fetch(endpoint, options)

		return response.json()
	} catch {
		throw new RetryError('Error fetching profile; retrying')
	}

}

/**
 * Handle identify event
 * @param  {SegmentIdentifyEvent} event
 * @param  {FunctionSettings} settings
 */
async function onIdentify(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/identify/
	throw new EventNotSupported('identify is not supported');
}

/**
 * Handle group event
 * @param  {SegmentGroupEvent} event
 * @param  {FunctionSettings} settings
 */
async function onGroup(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/group/
	throw new EventNotSupported('group is not supported');
}

/**
 * Handle page event
 * @param  {SegmentPageEvent} event
 * @param  {FunctionSettings} settings
 */
async function onPage(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/page/
	throw new EventNotSupported('page is not supported');
}

/**
 * Handle screen event
 * @param  {SegmentScreenEvent} event
 * @param  {FunctionSettings} settings
 */
async function onScreen(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/screen/
	throw new EventNotSupported('screen is not supported');
}

/**
 * Handle alias event
 * @param  {SegmentAliasEvent} event
 * @param  {FunctionSettings} settings
 */
async function onAlias(event, settings) {
	// Learn more at https://segment.com/docs/connections/spec/alias/
	throw new EventNotSupported('alias is not supported');
}

/**
 * Handle delete event
 * @param  {SegmentDeleteEvent} event
 * @param  {FunctionSettings} settings
 */
async function onDelete(event, settings) {
	// Learn more at https://segment.com/docs/partners/spec/#delete
	throw new EventNotSupported('delete is not supported');
}
