/* ═══════════════════════════════════════════════════════════════════
   ACTION GROUP TRAINING — HVAC modules (sop-hvac.js)
   Each test = the module's own questions + a random draw from the
   shared pools (pools: {ref: n, gas: n}) for 20 questions total.
   ═══════════════════════════════════════════════════════════════════ */
(function () {
const S = window.SOP.S, M = window.SOP.modules;

const REF_CHECK = [`Old refrigerant recovered properly`, `Both refrigerant lines flushed, clean and dry`, `New filter-drier installed`, `Nitrogen used during every brazing operation`, `Service valves and TXV protected from heat`, `Brazed joints inspected, Schrader cores installed`, `Pressure test passed and documented (450 PSIG, 15 minutes)`, `Vacuum pulled to 500 microns or lower`, `10-minute decay test passed below 1,000 microns`, `Refrigerant released per manufacturer instructions`, `Charge verified by the manufacturer's method`, `R-32 detection sensor wired, charge label filled in`];
const REF_RECORD = [`Refrigerant type`, `Nitrogen test pressure (PSI) and duration`, `Initial vacuum (microns)`, `10-minute decay reading (microns)`, `Refrigerant added (lb/oz) and total charge`, `Target and actual subcooling`, `Target and actual superheat`];
const END_CHECK = [`Job site cleaned, old equipment hauled away`, `Before and after photos taken`, `Customer shown system operation`];
const BASE_RECORD = [`Job address and date`, `Equipment model and serial numbers`];
const SIGN_RECORD = [`Lead installer and helper names`];
const FURN_CHECK = [`Furnace level, clearances met`, `Ductwork screwed and sealed, return fully sealed`, `Correct filter installed, rack covered`, `Gas shutoff, union and sediment trap installed`, `Every gas joint leak-tested`, `Polarity and ground verified`, `Inlet and manifold gas pressure set and recorded`, `Temperature rise inside nameplate range`, `Static pressure recorded`, `Combustion analysis recorded, CO under 100 ppm air-free`, `Safeties tested`, `CO alarm in the home confirmed`];
const FURN_RECORD = [`Fuel type and altitude setup`, `Inlet gas pressure (in. w.c.)`, `Manifold gas pressure (in. w.c.)`, `Temperature rise (nameplate range and actual)`, `Total external static pressure (in. w.c.)`, `Combustion: O2, CO air-free, stack temperature`];

/* ── 1. FURNACE 80% ─────────────────────────────────────────────── */
M.push({ id: `furnace80`, trade: `hvac`, art: `furnace80`, title: `Furnace Install — 80%`, short: `80% Furnace`,
  desc: `Non-condensing gas furnace with metal venting: removal, set, gas, vent, combustion air and startup.`,
  sections: [ S.arrive, S.furnRemove, S.furnSet, S.gas,
    { t: `Venting an 80% furnace (Category I)`, why: `An 80% furnace vents hot flue gas by draft. The vent has to be the right size, rise the whole way, and stay off combustibles.`, steps: [
      `A Goodman 80% furnace is a Category I, non-condensing appliance. It vents vertically into Type B vent or a properly lined chimney. It is not approved for horizontal venting, and it is never vented in PVC.`,
      `Inspect the existing vent or chimney before reusing it: size, condition, liner, cap, and rust or water streaks. Do not connect to a masonry chimney unless it has a metal liner or Type B vent, or the furnace is common-vented with a draft-hood appliance.`,
      `The vertical height of the vent must be at least as long as the horizontal run.`,
      `Size the vent and the connector from the venting tables in the manual for the furnace plus any water heater sharing the vent.`,
      `Slope the vent connector upward toward the vent at least 1/4 inch per foot. No dips, no downhill runs.`,
      `Keep the connector as short and straight as possible. Fasten every joint with three screws.`,
      `Hold the clearance to combustibles: 6 inches for single-wall connector, 1 inch for Type B vent, unless the listing says otherwise.`,
      `Do not use single-wall pipe in an attic, crawl space or other cold space, or through a wall, ceiling or floor.`,
      `Where the water heater shares the vent, the smaller connector enters above the larger one, and the water heater is draft-tested after the furnace is running. Do not common-vent the furnace with another brand's induced-draft appliance.`,
      `Confirm the vent terminates above the roof at the height the manual and code require, with a listed cap.`
    ], stop: `Damaged, undersized or unlined vent: do not fire the furnace into it. Call your manager.` },
    { t: `Combustion air`, why: `An 80% furnace burns air from the room it sits in. Starve it and it makes carbon monoxide.`, steps: [
      `Add up the input of every fuel-burning appliance in the space, in BTU per hour.`,
      `A closet or small mechanical room is a confined space and needs combustion air openings.`,
      `Air from inside the building: two openings, one within 12 inches of the ceiling and one within 12 inches of the floor, each with 1 square inch of free area per 1,000 BTU per hour and never less than 100 square inches.`,
      `Air from outdoors: two openings, each 1 square inch per 4,000 BTU per hour for direct openings or vertical ducts, and 1 square inch per 2,000 BTU per hour for horizontal ducts.`,
      `Count louvers and grilles at their free area, not the size of the hole.`,
      `Never block, cover or reduce an existing combustion air opening, and tell the customer not to store anything in front of them.`,
      `With the furnace and water heater firing and the exhaust fans and dryer running, check the water heater draft hood for spillage.`
    ] },
    S.furnElec, S.furnStart, S.closeout ],
  checklist: [...FURN_CHECK, `Vent connector slopes up 1/4 inch per foot, 3 screws per joint`, `Vent clearances to combustibles met`, `Combustion air openings sized and clear`, `Water heater draft-tested with furnace running`, ...END_CHECK],
  record: [...BASE_RECORD, ...FURN_RECORD, `Vent size and type`, ...SIGN_RECORD],
  pools: { gas: 10 },
  quiz: [
    { q: `What vent category is an 80% furnace, and what does it vent into?`, a: [`Category I: Type B vent or a properly lined chimney`, `Category IV: PVC pipe`, `Category III: any single-wall pipe`, `Category I: PVC, if the run is under 10 feet`], r: `Venting an 80% furnace` },
    { q: `Which way does the vent connector slope?`, a: [`Upward toward the vent, at least 1/4 inch per foot`, `Downward toward the vent, 1/4 inch per foot`, `Level is fine if the run is under 5 feet`, `Back toward the furnace so condensate drains`], r: `Venting an 80% furnace` },
    { q: `What clearance to combustibles does single-wall vent connector need?`, a: [`6 inches`, `1 inch`, `3 inches`, `None, if it is screwed tight`], r: `Venting an 80% furnace` },
    { q: `What clearance does Type B vent need?`, a: [`1 inch`, `6 inches`, `12 inches`, `None`], r: `Venting an 80% furnace` },
    { q: `The existing masonry chimney has no liner. What do you do?`, a: [`It needs a liner before the furnace is vented into it`, `Vent into it, masonry does not burn`, `Run the connector 2 feet up inside the chimney`, `Seal the cleanout door and use it`], r: `Venting an 80% furnace` },
    { q: `A furnace closet uses air from inside the house. What combustion air openings are needed?`, a: [`Two: within 12 inches of the top and the bottom, each 1 sq in per 1,000 BTU/h and at least 100 sq in`, `One opening of 50 sq in at the top`, `Two openings of any size`, `None, if the door is louvered at the bottom`], r: `Combustion air` },
    { q: `For horizontal ducts to outdoors, how big is each combustion air opening?`, a: [`1 sq in per 2,000 BTU/h`, `1 sq in per 4,000 BTU/h`, `1 sq in per 1,000 BTU/h`, `A flat 100 sq in`], r: `Combustion air` },
    { q: `The water heater shares the vent with the new furnace. What is required after startup?`, a: [`Draft-test the water heater with the furnace firing and exhaust fans running`, `Nothing, it was working before`, `Cap the water heater vent`, `Raise the water heater temperature`], r: `Combustion air` },
    { q: `Where is single-wall vent pipe not allowed?`, a: [`In an attic or other cold space, or through a wall, ceiling or floor`, `Inside the furnace room`, `Within 3 feet of the furnace`, `It is allowed everywhere`], r: `Venting an 80% furnace` },
    { q: `How is each vent connector joint fastened?`, a: [`Three screws`, `Foil tape only`, `One screw and mastic`, `Friction fit`], r: `Venting an 80% furnace` }
  ] });

/* ── 2. FURNACE 96% ─────────────────────────────────────────────── */
M.push({ id: `furnace96`, trade: `hvac`, art: `furnace96`, title: `Furnace Install — 96%`, short: `96% Furnace`,
  desc: `Condensing gas furnace: plastic venting, intake air, condensate drain, and the water heater that gets left behind on the old vent.`,
  sections: [ S.arrive, S.furnRemove, S.furnSet, S.gas,
    { t: `Venting a 96% furnace (Category IV)`, why: `A condensing furnace pushes cool, wet flue gas under pressure. The vent is sealed plastic and every foot of it drains back to the furnace.`, steps: [
      `A Goodman 96% furnace is a Category IV, condensing appliance. Use only the vent material the manual lists (PVC, CPVC or ABS pipe, or an approved vent system) in the diameter it calls for, with medium or long radius elbows.`,
      `Never vent a condensing furnace into the old metal vent or chimney, and never share its vent with another appliance.`,
      `Use the manual's vent table. Count every elbow as equivalent length, and stay inside the maximum length for the pipe size. Every vent has at least 5 feet of pipe and one elbow.`,
      `At 5,000 feet of elevation or higher, use 3-inch vent and intake pipe. Above 7,000 feet the furnace needs Goodman's high-altitude kit.`,
      `Install it as two-pipe direct vent wherever the manual allows, with combustion air piped from outdoors.`,
      `Slope all horizontal vent pipe back toward the furnace at least 1/4 inch per foot so condensate drains to the furnace. No sags or low spots.`,
      `Support horizontal pipe every 3 to 5 feet so it cannot sag.`,
      `Cut pipe square and deburr it. Prime and cement every joint (ASTM F656 primer and D2564 cement on PVC) and seat each joint fully.`,
      `Terminate at least 12 inches above grade or expected snow. Direct vent (two-pipe): at least 12 inches from any opening into the building. Non-direct vent: 4 feet below, 4 feet to the side of, or 1 foot above any door or window. Never terminate in an attic or crawl space or over a walkway, and space the two pipes the way the manual's figure shows.`,
      `Seal the wall or roof penetration.`
    ], stop: `If the vent run is longer than the table allows for that pipe size, increase the pipe size or reroute. Do not "make it work".` },
    { t: `Condensate drain`, why: `A 96% furnace makes gallons of acidic water a day. A drain that is not trapped, primed and sloped shuts the furnace down or floods the floor.`, steps: [
      `Set the furnace level side to side with the slight pitch the manual calls for, so condensate drains to the trap.`,
      `When you convert the furnace to another position, move the drain trap and the pressure switch tubing exactly as the manual shows.`,
      `Install the factory trap and prime it: pour water in until it shows at both sides of the trap outlet. Do not add a second trap anywhere in the drain.`,
      `Run the drain 3/4 inch, sloped 1/4 inch per foot, to an approved drain. Do not run it outdoors where it can freeze.`,
      `Use a condensate pump where there is no gravity drain, wired so a pump failure shuts the furnace off.`,
      `Install a condensate neutralizer where code or the drain material calls for one.`,
      `Where the furnace and the AC coil share a drain, install an open tee near the coil as the manual shows.`,
      `Horizontal furnace: leave at least 5.5 inches under it for the trap, and install an auxiliary drain pan with a water-level shutoff switch under it.`,
      `In an attic, crawl space or garage that can freeze, protect the trap and the drain line from freezing.`,
      `Run the furnace for 15 minutes and watch the condensate flow through the trap and down the drain.`
    ] },
    { t: `The water heater left on the old vent`, why: `When an 80% furnace is replaced by a 96%, the gas water heater is left alone on a vent sized for two appliances. An oversized vent can fail to draft and spill carbon monoxide.`, steps: [
      `Find out what else was sharing the old furnace vent before you remove the furnace.`,
      `Check the remaining water heater against the venting tables for the existing vent or chimney by itself.`,
      `If the vent is now too large, it needs to be resized or relined. Tell your manager and the customer before you leave.`,
      `Cap the opening where the old furnace connector came out.`,
      `Draft-test the water heater after 5 minutes of firing with the exhaust fans and dryer running.`,
      `Confirm the mechanical room still has combustion air for the water heater.`
    ], stop: `A water heater that spills flue gas is not left in service. Shut it off and call your manager.` },
    S.furnElec, S.furnStart, S.closeout ],
  checklist: [...FURN_CHECK, `Vent material, size and length match the manual`, `Vent slopes back to the furnace, supported, no sags`, `All vent joints primed and cemented`, `Terminations at the listed clearances`, `Condensate trap primed, drain sloped, flow confirmed`, `Old vent opening capped, water heater draft-tested`, ...END_CHECK],
  record: [...BASE_RECORD, ...FURN_RECORD, `Vent pipe size and equivalent length`, `Water heater draft test result`, ...SIGN_RECORD],
  pools: { gas: 10 },
  quiz: [
    { q: `Which way does the horizontal vent on a 96% furnace slope?`, a: [`Back toward the furnace, at least 1/4 inch per foot`, `Away from the furnace toward the outdoors`, `Dead level`, `Either way, the inducer pushes the water out`], r: `Venting a 96% furnace` },
    { q: `Can a 96% furnace vent into the old B-vent or chimney?`, a: [`No. It uses only the vent material the manual lists, and never shares a vent`, `Yes, if the B-vent is in good shape`, `Yes, if the chimney is lined`, `Yes, for runs under 15 feet`], r: `Venting a 96% furnace` },
    { q: `How do elbows affect the vent length?`, a: [`Each elbow counts as equivalent length against the maximum in the vent table`, `They do not count`, `Only elbows past the fourth one count`, `They shorten the equivalent length`], r: `Venting a 96% furnace` },
    { q: `The vent run is 15 feet longer than the table allows for 2-inch pipe. What do you do?`, a: [`Go up to the pipe size the table allows, or reroute`, `Install it and check the pressure switch closes`, `Remove the intake pipe to make up for it`, `Drill out the inducer restrictor`], r: `Venting a 96% furnace` },
    { q: `What must be done to the condensate trap before startup?`, a: [`Prime it with water`, `Leave it dry so it can vent`, `Fill it with antifreeze`, `Remove the cap`], r: `Condensate drain` },
    { q: `Where should the condensate drain NOT be run?`, a: [`Outdoors where it can freeze`, `To a floor drain`, `To a condensate pump`, `To a laundry standpipe through an air gap`], r: `Condensate drain` },
    { q: `You convert the furnace to horizontal. What else has to change?`, a: [`The drain trap and pressure switch tubing are moved as the manual shows`, `Nothing, the furnace is multi-position`, `Only the blower speed`, `The gas valve is turned over`], r: `Condensate drain` },
    { q: `An 80% furnace was replaced with a 96%. Why does the water heater need attention?`, a: [`It is now alone on a vent sized for two appliances and may not draft`, `It will now get too much gas pressure`, `Its warranty is void`, `It has to be converted to PVC`], r: `The water heater left on the old vent` },
    { q: `The water heater spills flue gas at the draft hood after 5 minutes. What do you do?`, a: [`Shut it off and call your manager. It is not left in service`, `Open a window and leave it`, `Tape the draft hood`, `Tell the customer to run it only at night`], r: `The water heater left on the old vent` },
    { q: `What does the SOP require at every plastic vent joint?`, a: [`Square cut, deburred, primed and cemented, fully seated`, `Dry fit and a screw`, `Silicone only`, `Foil tape`], r: `Venting a 96% furnace` }
  ] });

/* ── 3. AC SINGLE STAGE ─────────────────────────────────────────── */
M.push({ id: `ac1`, trade: `hvac`, art: `ac`, title: `AC Install — Single Stage`, short: `AC Single Stage`,
  desc: `Split-system air conditioner: recovery, line flush, brazing with nitrogen, pressure test, vacuum decay test and charging.`,
  expect: [`Two technicians for the line flush. Nitrogen for every braze. Pressure test and vacuum decay test on every system. Refrigerant is never released until both pass.`],
  sections: [ S.arrive, S.a2l, S.recover, S.outdoor, S.coil, S.flush, S.braze, S.pressure, S.vacuum, S.release,
    { t: `Single-stage startup checks`, why: `A single-stage system has one speed. If the readings are off, it is off all the time.`, steps: [
      `Confirm the thermostat is set up for one stage of cooling and that Y, G, R and C are landed correctly at the furnace or air handler and the outdoor unit.`,
      `Let the system run at least 15 minutes before you take final readings.`,
      `Measure the temperature split across the coil as a cross-check. It is not a charging method.`,
      `Measure compressor and fan motor amps against the nameplate.`,
      `Confirm the contactor pulls in cleanly, the time delay works, and the unit starts and stops from the thermostat.`,
      `Confirm the condensate is draining with the system running.`,
      `Check for vibration and noise at the outdoor unit and where the line set touches the house.`
    ] },
    S.closeout ],
  checklist: [...REF_CHECK, `Outdoor unit level with clearances met`, `Breaker and wire match the nameplate`, `Suction line insulated end to end`, `Drain trapped, sloped and tested with water`, `Float switch tested`, `Airflow set, new filter installed`, `Amps and operating readings recorded`, ...END_CHECK],
  record: [...BASE_RECORD, ...REF_RECORD, `Compressor and fan amps`, `Supply and return air temperatures`, ...SIGN_RECORD],
  pools: { ref: 14 },
  quiz: [
    { q: `What sizes the breaker and the wire for the outdoor unit?`, a: [`The nameplate: maximum overcurrent protection and minimum circuit ampacity`, `Whatever breaker the old unit had`, `Always 30 amps on 10-gauge`, `The tonnage times 10`], r: `Set the outdoor unit` },
    { q: `Where does the disconnect go?`, a: [`Within sight of the unit and easy to reach, not behind it`, `Directly behind the unit`, `Inside at the furnace`, `Anywhere within 50 feet`], r: `Set the outdoor unit` },
    { q: `What is the nominal airflow target per ton, unless the manual says otherwise?`, a: [`About 400 CFM`, `About 200 CFM`, `About 600 CFM`, `About 1,000 CFM`], r: `Indoor coil, condensate & airflow` },
    { q: `The coil is in an attic above a finished ceiling. What is required under it?`, a: [`A secondary drain pan with its own drain or a float switch that shuts off cooling`, `A second filter`, `A plastic sheet`, `Nothing, if the primary drain is trapped`], r: `Indoor coil, condensate & airflow` },
    { q: `Which is true about A2L refrigerant cylinders?`, a: [`Red band or top, with a left-hand thread on the connection`, `Same fittings as R-410A cylinders`, `Yellow top, right-hand thread`, `They can be topped off with R-410A`], r: `Refrigerant type` },
    { q: `What is the temperature split across the coil used for?`, a: [`A cross-check only. It is not a charging method`, `Setting the charge`, `Sizing the breaker`, `Nothing, never measure it`], r: `Single-stage startup checks` }
  ] });

/* ── 4. AC TWO STAGE ────────────────────────────────────────────── */
M.push({ id: `ac2`, trade: `hvac`, art: `ac2`, title: `AC Install — Two Stage`, short: `AC Two Stage`,
  desc: `Everything in the single-stage SOP plus staging: control wiring, airflow for each stage, and verifying the charge in Stage 1 and Stage 2.`,
  expect: [`Two technicians for the line flush. Nitrogen for every braze. Pressure test and vacuum decay test on every system.`, `A two-stage system is not charged or commissioned until every stage has been verified.`],
  sections: [ S.arrive, S.a2l, S.recover, S.outdoor, S.coil,
    { t: `Two-stage wiring & airflow setup`, why: `A two-stage unit wired or set up as single-stage runs in high all the time, or never gets there.`, steps: [
      `Confirm the indoor unit can deliver a separate airflow for each stage and is matched to the outdoor unit.`,
      `Pull thermostat wire with enough conductors for Y1, Y2 and C, plus the data wires on a communicating system. Do not double up conductors.`,
      `Land Y1 and Y2 at the thermostat, the indoor unit and the outdoor unit as the wiring diagram shows.`,
      `Set the thermostat for two stages of cooling. Do not leave it on the single-stage default.`,
      `Set the blower airflow for low stage and for high stage with the dip switches, taps or controller, from the manufacturer's table.`,
      `Set any dehumidification feature the way the manual shows.`,
      `On a communicating system, run the setup routine and confirm the control sees the outdoor unit and its size.`
    ] },
    S.flush, S.braze, S.pressure, S.vacuum, S.release,
    { t: `Two-stage charging & stage verification`, why: `The charge has to be right under the conditions and stage the manufacturer specifies, and both stages have to be proven.`, steps: [
      `Goodman two-stage units are charged in low stage. Use the manufacturer's test mode if the system has one.`,
      `Start the system in Stage 1 and let it stabilize.`,
      `Verify the charging conditions the manufacturer requires.`,
      `Adjust the charge until the manufacturer's subcooling, superheat or charging target is met.`,
      `Verify Stage 1 is operating properly and record the readings.`,
      `Activate Stage 2 by the manufacturer's commissioning procedure and let it stabilize.`,
      `Verify operation in Stage 2: blower airflow steps up, amps and pressures change, and the readings are in range.`,
      `Confirm the charge is correct under the manufacturer's specified test conditions.`,
      `Confirm the thermostat brings on Stage 2 by itself and drops back to Stage 1.`,
      `Record all final readings for both stages.`
    ], stop: `Only one stage will run: the job is not finished. Find the wiring or setup problem before you leave.` },
    S.closeout ],
  checklist: [...REF_CHECK, `Outdoor unit level with clearances met`, `Breaker and wire match the nameplate`, `Y1 and Y2 wired, thermostat set for two stages`, `Blower airflow set for each stage`, `Drain trapped, sloped and tested with water`, `Float switch tested`, `Stage 1 operation verified`, `Stage 2 operation verified`, `Readings recorded for both stages`, ...END_CHECK],
  record: [...BASE_RECORD, ...REF_RECORD, `Stage 1 operating readings`, `Stage 2 operating readings`, `Airflow setting for each stage`, ...SIGN_RECORD],
  pools: { ref: 12 },
  quiz: [
    { q: `The thermostat was left on its single-stage default with a two-stage unit. What is the result?`, a: [`The system will not stage properly, and the job is not finished`, `Nothing, the outdoor unit stages by itself`, `It only affects heating`, `The system will charge itself correctly`], r: `Two-stage wiring & airflow setup` },
    { q: `The old thermostat cable does not have enough conductors for Y1, Y2 and C. What do you do?`, a: [`Pull new wire with enough conductors`, `Jumper Y1 to Y2`, `Skip the C wire`, `Use the green wire for Y2 and leave the fan off`], r: `Two-stage wiring & airflow setup` },
    { q: `Which stage is a Goodman two-stage unit charged in?`, a: [`Low stage`, `High stage`, `Either, whichever is running`, `Neither, it is charged with the unit off`], r: `Two-stage charging & stage verification` },
    { q: `When is a two-stage system considered commissioned?`, a: [`When every stage has been verified and recorded`, `When Stage 1 subcooling is on target`, `When the vacuum decay test passes`, `When the thermostat shows "cooling"`], r: `Two-stage charging & stage verification` },
    { q: `What should you see when Stage 2 comes on?`, a: [`Blower airflow steps up and amps and pressures change`, `Nothing changes`, `The outdoor fan stops`, `Suction pressure rises and amps drop`], r: `Two-stage charging & stage verification` },
    { q: `What is set separately for low stage and high stage at the indoor unit?`, a: [`Blower airflow`, `Filter size`, `Drain slope`, `Line-set size`], r: `Two-stage wiring & airflow setup` },
    { q: `Only Stage 1 will run at the end of the job. What does the SOP say?`, a: [`The job is not finished. Find the wiring or setup problem before leaving`, `Note it and send a service tech later`, `Add refrigerant until Stage 2 comes on`, `It is fine in mild weather`], r: `Two-stage charging & stage verification` },
    { q: `What does the final thermostat check prove on a two-stage job?`, a: [`It brings on Stage 2 by itself and drops back to Stage 1`, `It holds 72 degrees`, `It shows the outdoor temperature`, `It is level`], r: `Two-stage charging & stage verification` }
  ] });

/* ── 5. HEAT PUMP ───────────────────────────────────────────────── */
const hpOutdoor = { t: `Set the heat pump: pad, risers & electrical`, why: `A heat pump runs all winter and sheds water every time it defrosts. It sits up off the pad so that water can leave.`, steps: [
  `Set the pad solid and level, then set the unit on risers or a stand so defrost water and ice drain freely away from the base pan.`,
  `Goodman's minimum elevation depends on how cold it gets: 2.5 inches where it stays at 15 degrees F or warmer, 8 inches down to minus 5, and 12 inches where it gets colder than that. Go higher where snow stacks up, and keep it out from under roof edges that dump snow, ice or rain on it.`,
  `Do not block the drain holes in the base pan.`,
  ...S.outdoor.steps.slice(1, 6),
  `Size the line set to the manufacturer's table. On a heat pump the large line carries hot gas in heating, so insulate it for its full length.`,
  `Any liquid-line filter-drier installed on a heat pump must be a bi-flow drier made for heat pumps.`
] };
const hpAirHandler = { t: `Air handler, auxiliary heat & condensate`, why: `The electric heat strips are the home's backup and its defrost heat. They get their own correctly sized circuits.`, steps: [
  `Set the air handler level in the position it is approved for, with service clearance in front.`,
  `Install the heater kit listed for that air handler. Size the breakers and wire to the heater kit's label; large kits need more than one circuit.`,
  `Seal the cabinet to the supply and return, and install the correct filter.`,
  ...S.coil.steps.slice(2, 8)
] };
const hpControls = { t: `Thermostat, reversing valve & defrost setup`, why: `Wrong reversing-valve setting means heat when the customer asks for cooling.`, steps: [
  `Use a heat pump thermostat and configure it as a heat pump with electric auxiliary heat.`,
  `Set the reversing valve terminal correctly. Most brands energize the valve in cooling (O). Some, including Rheem and Ruud, energize it in heating (B). Check the manual.`,
  `Wire auxiliary heat (W/W2/Aux) and emergency heat (E) as the diagram shows, including the wire from the defrost board that brings on the strips during defrost.`,
  `Set the auxiliary heat lockout and staging in the thermostat so the strips do not run when the heat pump can carry the load.`,
  `Set the defrost interval on the board (30, 60 or 90 minutes) the way the Goodman manual specifies for the region.`
] };
const hpStart = { t: `Heat pump startup: cooling, heating & defrost`, why: `Every mode the customer will use is run and measured before you leave.`, steps: [
  `Check the charge in cooling mode by the manufacturer's method when outdoor temperature allows.`,
  `Below 60 degrees F outside the charge cannot be checked in cooling. Charge by weight for the line-set size and length per the manual, and note on the job that the final adjustment has to be made in cooling when it warms up.`,
  `Run cooling: the large line is cold, the reversing valve has shifted, and the readings are in range.`,
  `Run heating: the large line is hot, supply air is warm, and the outdoor coil is cold.`,
  `Force a defrost with the board's test pins: the outdoor fan stops, the valve shifts, the strips come on, and the unit returns to heating.`,
  `Run emergency heat: the outdoor unit stays off and the strips carry the heat.`,
  `Measure heat strip amps against the heater kit label and confirm each stage comes on.`,
  `Record readings for cooling and heating.`
] };
M.push({ id: `heatpump`, trade: `hvac`, art: `heatpump`, title: `Heat Pump Install`, short: `Heat Pump`,
  desc: `All-electric heat pump with air handler and auxiliary heat: risers, bi-flow drier, reversing valve, defrost and both-mode startup.`,
  expect: [`Two technicians for the line flush. Nitrogen for every braze. Pressure test and vacuum decay test on every system.`, `Cooling, heating, defrost and emergency heat are all run before you leave.`],
  sections: [ S.arrive, S.a2l, S.recover, hpOutdoor, hpAirHandler, hpControls, S.flush, S.braze, S.pressure, S.vacuum, S.release, hpStart, S.closeout ],
  checklist: [...REF_CHECK, `Unit on risers, drain holes clear, above snow line`, `Bi-flow filter-drier installed`, `Both lines insulated as required`, `Heater kit circuits sized to the label`, `Reversing valve (O/B) set correctly`, `Auxiliary heat lockout set`, `Cooling mode verified`, `Heating mode verified`, `Defrost cycle tested`, `Emergency heat tested`, `Drain tested with water, float switch tested`, ...END_CHECK],
  record: [...BASE_RECORD, ...REF_RECORD, `Cooling mode readings`, `Heating mode readings`, `Heat strip amps per stage`, `Thermostat O/B setting and aux lockout`, ...SIGN_RECORD],
  pools: { ref: 10 },
  quiz: [
    { q: `Why does a heat pump sit on risers?`, a: [`So defrost water drains away from the base pan and the unit clears the snow`, `To reduce noise`, `To shorten the line set`, `To keep the disconnect dry`], r: `Set the heat pump` },
    { q: `What kind of filter-drier goes on a heat pump?`, a: [`A bi-flow drier made for heat pumps`, `A standard one-direction liquid-line drier`, `A suction-line drier only`, `None, heat pumps do not use driers`], r: `Set the heat pump` },
    { q: `Why is the large line insulated for its full length on a heat pump?`, a: [`It carries hot gas in heating mode`, `Only to stop sweating in summer`, `To protect it from sunlight`, `It is not required`], r: `Set the heat pump` },
    { q: `What does "O" versus "B" set at the thermostat?`, a: [`Whether the reversing valve is energized in cooling or in heating`, `Whether the outdoor fan runs in defrost`, `Whether the blower runs on high or low`, `Whether the strips are on one stage or two`], r: `Thermostat, reversing valve & defrost setup` },
    { q: `The customer calls for cooling and gets heat on a new install. What is the first thing to check?`, a: [`The O/B reversing-valve setting in the thermostat`, `The refrigerant charge`, `The breaker size`, `The filter`], r: `Thermostat, reversing valve & defrost setup` },
    { q: `It is 38 degrees outside on install day. How is the charge handled?`, a: [`Charge by weight per the manual and note that the final adjustment is made in cooling when it warms up`, `Charge by cooling subcooling anyway`, `Add refrigerant until the suction line frosts`, `Leave the factory charge and do not check`], r: `Heat pump startup` },
    { q: `What should happen in a forced defrost?`, a: [`Outdoor fan stops, valve shifts, strips come on, then the unit returns to heating`, `Outdoor fan speeds up and the strips stay off`, `The compressor shuts off for 10 minutes`, `The thermostat goes blank`], r: `Heat pump startup` },
    { q: `What sizes the breakers and wire for the electric heat?`, a: [`The heater kit's label`, `The outdoor unit nameplate`, `The thermostat`, `A flat 60 amps`], r: `Air handler, auxiliary heat & condensate` },
    { q: `In emergency heat, what should the outdoor unit be doing?`, a: [`Nothing. It stays off and the strips carry the heat`, `Running with the strips`, `Running in defrost`, `Running in cooling`], r: `Heat pump startup` },
    { q: `Why is an auxiliary heat lockout set?`, a: [`So the strips do not run when the heat pump can carry the load`, `So the strips never run`, `So the compressor is locked out in winter`, `To protect the thermostat`], r: `Thermostat, reversing valve & defrost setup` }
  ] });

/* ── 6. DUAL FUEL ───────────────────────────────────────────────── */
M.push({ id: `dualfuel`, trade: `hvac`, art: `dualfuel`, title: `Dual Fuel System Install`, short: `Dual Fuel`,
  desc: `Heat pump on a gas furnace. A full furnace install plus a full heat pump install, tied together by the controls that decide which one heats.`,
  expect: [`This job is a furnace install and a heat pump install. Both SOPs apply in full.`, `The heat pump and the furnace never heat at the same time, except the furnace tempering the air during defrost.`],
  sections: [ S.arrive, S.a2l, S.recover, S.furnRemove, S.furnSet, S.gas,
    { t: `Furnace venting & condensate`, why: `The furnace half of the job is vented exactly as its own SOP requires.`, steps: [
      `80% furnace: follow the 80% Furnace SOP for Category I venting and combustion air.`,
      `96% furnace: follow the 96% Furnace SOP for plastic venting, condensate drain, and the water heater left on the old vent.`,
      `Do not start the heat pump work until the furnace venting is complete and correct.`
    ] },
    hpOutdoor,
    { t: `Coil on the furnace, condensate & airflow`, why: `The heat pump coil sits in the furnace's hot supply air, which is why the two can never run together.`, steps: [
      `The heat pump coil goes on the supply (discharge) side of the furnace, after the heat exchanger.`,
      ...S.coil.steps.slice(0, 9)
    ] },
    { t: `Dual fuel controls & switchover`, why: `The controls decide which heat source runs. Set wrong, the heat pump trips on high pressure or the customer burns gas they did not need to.`, steps: [
      `Use a dual fuel thermostat with an outdoor temperature sensor, or the manufacturer's dual fuel kit. A standard heat pump thermostat set for electric backup is wrong for this job.`,
      `Configure the thermostat as a heat pump with gas (fossil fuel) backup, so the heat pump shuts off whenever the furnace fires.`,
      `Install the outdoor sensor out of direct sun and away from the unit's discharge air.`,
      `Set the switchover (balance point) temperature your manager specifies for the job. Below it the furnace heats; above it the heat pump heats.`,
      `Set the reversing valve terminal (O or B) for the brand.`,
      `Wire the defrost board's heat output to the furnace W so the furnace tempers the air during defrost.`,
      `Install the plenum or discharge sensor if the manufacturer's kit includes one.`,
      S.furnElec.steps[1], S.furnElec.steps[5]
    ], stop: `If the heat pump and the furnace are both heating outside of defrost, shut the system down and fix the controls. High head pressure will damage the compressor.` },
    S.flush, S.braze, S.pressure, S.vacuum, S.release, S.furnStart,
    { t: `Dual fuel startup: prove the changeover`, why: `Each heat source is run by itself, and then the changeover between them is proven.`, steps: [
      `Run cooling and verify the charge by the manufacturer's method.`,
      `Run heat pump heating with the outdoor temperature above the switchover: the heat pump runs and the furnace stays off.`,
      `Force the changeover by raising the switchover setting or using the thermostat's test: the heat pump shuts off, then the furnace fires.`,
      `Confirm the heat pump does not restart while the furnace is firing.`,
      `Force a defrost: the furnace fires to temper the air, then shuts off when defrost ends.`,
      `Run emergency heat: furnace only.`,
      `Return the switchover temperature to the specified setting and write it on the job.`
    ] },
    S.closeout ],
  checklist: [...REF_CHECK, ...FURN_CHECK.slice(3, 11), `Furnace venting complete per its SOP`, `Heat pump on risers, bi-flow drier installed`, `Thermostat set as heat pump with gas backup`, `Outdoor sensor installed, switchover temperature set`, `Heat pump and furnace proven not to heat together`, `Defrost with furnace tempering tested`, `Emergency heat tested`, ...END_CHECK],
  record: [...BASE_RECORD, ...REF_RECORD, ...FURN_RECORD, `Switchover (balance point) temperature`, `Thermostat O/B setting`, ...SIGN_RECORD],
  pools: { ref: 6, gas: 6 },
  quiz: [
    { q: `Where is the heat pump coil on a dual fuel system?`, a: [`On the supply side of the furnace, after the heat exchanger`, `On the return side, before the blower`, `In the outdoor unit only`, `In the furnace vent`], r: `Coil on the furnace` },
    { q: `Why can the heat pump and furnace not heat at the same time?`, a: [`Hot furnace air across the coil drives head pressure up and damages the compressor`, `It trips the furnace breaker`, `The thermostat cannot power both`, `It makes the house too humid`], r: `Dual fuel controls & switchover` },
    { q: `When is the furnace allowed to run while the heat pump is running?`, a: [`During defrost, to temper the air`, `Any time it is below freezing`, `Never, under any condition`, `Whenever the thermostat calls for Stage 2`], r: `Dual fuel controls & switchover` },
    { q: `How is the thermostat configured?`, a: [`Heat pump with gas (fossil fuel) backup`, `Heat pump with electric backup`, `Conventional gas heat with AC`, `Two-stage gas heat`], r: `Dual fuel controls & switchover` },
    { q: `Where does the outdoor sensor go?`, a: [`Out of direct sun and away from the unit's discharge air`, `On the south wall in the sun`, `Inside the outdoor unit cabinet`, `Next to the dryer vent`], r: `Dual fuel controls & switchover` },
    { q: `What does the switchover (balance point) temperature do?`, a: [`Below it the furnace heats; above it the heat pump heats`, `Below it the heat pump heats; above it the furnace heats`, `It sets when cooling starts`, `It sets the defrost time`], r: `Dual fuel controls & switchover` },
    { q: `How do you prove the changeover at startup?`, a: [`Force it and confirm the heat pump shuts off before the furnace fires and does not restart`, `Wait for a cold day`, `Check that both run together for a minute`, `Pull the outdoor disconnect`], r: `Dual fuel startup` },
    { q: `What happens in emergency heat on a dual fuel system?`, a: [`The furnace heats by itself`, `The electric strips come on`, `The heat pump runs in defrost`, `Both run together`], r: `Dual fuel startup` }
  ] });

/* ── 7. PACKAGED UNIT ───────────────────────────────────────────── */
M.push({ id: `package`, trade: `hvac`, art: `package`, title: `Packaged Unit Install`, short: `Packaged Unit`,
  desc: `Rooftop or ground-mount packaged unit (gas/electric or heat pump): lift, curb or stand, duct, drain, power, gas and startup.`,
  expect: [`Nobody works on a roof without the fall protection the job requires, and nobody stands under a lifted load.`, `The unit is factory charged. Its refrigerant circuit is checked, not opened.`],
  sections: [ S.arrive,
    { t: `Lift & roof safety`, why: `The lift is the most dangerous part of the job.`, steps: [
      `Confirm the crane or lift time with the office, and have the old unit disconnected and ready before the crane arrives.`,
      `Check the roof and the path to it: access, soft spots, skylights, and where materials will be staged.`,
      `Use fall protection when you are working 6 feet or more above a lower level near an unprotected edge, and follow the company's roof rules.`,
      `Rig from the four lifting holes at the corners of the base frame with shackles, with spreader bars across the unit so the cables do not crush the cabinet, and at least 60 inches between the unit and the hook. Keep the unit upright; the condenser end is heavier.`,
      `One person signals the crane operator. Keep everyone out from under the load, and use a tag line.`,
      `Watch for overhead power lines.`,
      `Protect the roof surface where you walk and where you set tools and panels.`
    ], stop: `High wind, a bad rigging point, or people under the load: stop the lift.` },
    { t: `Recover refrigerant & remove the old unit`, why: `The old unit is empty, dead and disconnected before it is lifted.`, steps: [
      `Shut off and verify power at the disconnect. Shut off and cap the gas on a gas/electric unit.`,
      `Recover the refrigerant from the old unit before it leaves the roof. Never cut lines or vent it.`,
      `Disconnect the power whip, control wire, gas line, drain and duct connections.`,
      `Lift the old unit off and inspect the curb or stand, the roof around it, and the supply and return duct for rust, rot, crushed duct and leaks.`,
      `Repair or replace a damaged curb, stand or duct before the new unit is set.`
    ] },
    { t: `Set the unit on the curb or stand`, why: `A unit that is not level does not drain, and a curb that is not sealed leaks air and rain into the house.`, steps: [
      `Confirm the new unit fits the existing curb or stand. Use the manufacturer's curb adapter when it does not; do not build one out of sheet metal and tape.`,
      `Confirm the unit is set up for the airflow direction of the job, downflow or horizontal, and convert the panels the way the manual shows.`,
      `Install new gasket on the curb and set the unit square on it.`,
      `Set the unit level.`,
      `Fasten the unit to the curb or stand the way the manual and local code require.`,
      `Keep Goodman's clearances: 36 inches for service access, 12 inches on the air-inlet sides, 48 inches under any overhang. Keep the flue outlet at least 12 inches from any opening into the building.`,
      `Connect the supply and return. Seal every joint with mastic, and use insulated, weatherproofed duct outdoors.`,
      `Seal and flash every roof penetration.`,
      `Install the correct filters, in the unit or at the return grille, wherever the system is designed for them.`
    ] },
    { t: `Condensate drain`, why: `On most packaged units the drain pan is on the suction side of the blower. Without a trap the blower holds the water in the pan until it overflows.`, steps: [
      `Install an external trap at the unit's 3/4-inch drain connection, built to the dimensions in the manual. Thread the fitting in hand-tight only.`,
      `Run the drain 3/4 inch minimum, sloped 1/4 inch per foot, to an approved location. Do not drain across a walkway or onto the roof where code forbids it.`,
      `Support the drain so it cannot sag.`,
      `Prime the trap and pour water into the pan with the blower running to prove it drains.`
    ] },
    { t: `Electrical & controls`, why: `Packaged units pull a lot of current. The nameplate decides the wire and the breaker.`, steps: [
      `Install the disconnect within sight of the unit and easy to reach.`,
      `Breaker or fuse no larger than the nameplate maximum overcurrent protection. Wire no smaller than the minimum circuit ampacity calls for.`,
      `Verify the supply voltage and phase match the nameplate before you energize. A 208/230-volt unit needs 197 to 253 volts, and the transformer is rewired for a 208-volt supply.`,
      `The unit's R-32 leak detection system must stay powered. Do not leave the disconnect off after the job.`,
      `Use liquid-tight conduit and fittings, tighten every lug and bond the ground.`,
      `Run thermostat wire in a protected path, seal where it enters the unit, and land it on the correct terminals.`,
      `Configure the thermostat for the unit type: gas/electric or heat pump, and the number of stages.`,
      `Set the blower speed for the heating temperature rise and the cooling airflow.`
    ] },
    { t: `Gas piping (gas/electric units)`, why: S.gas.why, steps: [
      ...S.gas.steps.slice(0, 4),
      `Use pipe and fittings rated for outdoor use, supported off the roof, and protected from corrosion.`,
      ...S.gas.steps.slice(4, 8),
      `Install the flue hood and the combustion air hood that ship loose with the unit, each with its opening facing down and three screws.`
    ], stop: S.gas.stop },
    { t: `Startup & commissioning`, why: `A factory charge is not proof the unit is right. It is measured running.`, steps: [
      `Remove all packaging and the duct covers, retighten anything that loosened in shipping, and check that the blower and fans turn freely.`,
      `Check incoming voltage with the unit running.`,
      `Run cooling 10 to 15 minutes, with 60 degrees F or warmer outside, and check the charge against the targets in the manual: superheat on piston models, subcooling on TXV models.`,
      `Measure compressor and fan amps against the nameplate.`,
      `Gas heat: measure inlet and manifold gas pressure, watch ignition, and measure temperature rise against the nameplate range.`,
      `Gas heat: inlet pressure 5.0 to 10.0 in. w.c. on natural gas, manifold 3.5 in. w.c. on high fire. Above 2,000 feet a Goodman packaged gas unit needs the high-altitude kit, which covers every Utah job.`,
      `Heat pump: run heating, force a defrost, and test auxiliary heat.`,
      `Measure external static pressure and record it.`,
      `Cycle every mode from the thermostat and confirm the condensate is draining.`,
      `Put every panel back with every screw.`
    ] },
    S.closeout ],
  checklist: [`Old refrigerant recovered before removal`, `Lift completed with rated rigging and spreader bars`, `Curb or stand sound, new gasket installed`, `Unit level, fastened, clearances met`, `Duct sealed and weatherproofed`, `Roof penetrations sealed and flashed`, `Drain trapped, sloped, primed and tested`, `Disconnect, breaker and wire match the nameplate`, `Voltage and phase verified`, `Gas joints leak-tested, sediment trap installed`, `Flue hood installed`, `Charge checked by the manufacturer's chart`, `Gas pressure and temperature rise recorded`, `Static pressure and amps recorded`, `All panels and screws in place`, `Filters installed`, ...END_CHECK],
  record: [...BASE_RECORD, `Supply voltage and phase`, `Compressor and fan amps`, `Charge check result`, `Inlet and manifold gas pressure`, `Temperature rise`, `Total external static pressure`, ...SIGN_RECORD],
  pools: { gas: 4 },
  quiz: [
    { q: `How is a packaged unit rigged for the lift?`, a: [`From the four corner lifting holes with shackles and spreader bars`, `With straps around the middle of the cabinet`, `By the condenser coil guard`, `By the duct flanges`], r: `Lift & roof safety` },
    { q: `Who signals the crane operator?`, a: [`One person`, `Whoever is closest`, `Everyone on the roof`, `Nobody, the operator can see`], r: `Lift & roof safety` },
    { q: `When must the old unit's refrigerant be recovered?`, a: [`Before the unit leaves the roof`, `At the shop the next day`, `It does not need to be if the unit is scrapped`, `After the new unit is running`], r: `Recover refrigerant & remove the old unit` },
    { q: `The new unit does not match the old curb. What do you use?`, a: [`The manufacturer's curb adapter`, `A sheet-metal transition built on site and taped`, `Wood blocks`, `Extra gasket`], r: `Set the unit on the curb or stand` },
    { q: `Why does a packaged unit drain need a trap?`, a: [`The pan is on the suction side of the blower, which holds water in without a trap`, `To keep bugs out`, `To slow the water down`, `It does not need one outdoors`], r: `Condensate drain` },
    { q: `How do you prove the drain works?`, a: [`Prime the trap and pour water in the pan with the blower running`, `Look at it`, `Wait for a humid day`, `Blow through it`], r: `Condensate drain` },
    { q: `What do you verify before energizing the unit?`, a: [`Supply voltage and phase match the nameplate`, `The thermostat has batteries`, `The roof is dry`, `The filters are in`], r: `Electrical & controls` },
    { q: `The unit ships factory charged. How is the charge handled?`, a: [`Checked running against the manual's superheat or subcooling target, at 60 degrees F or warmer`, `Recovered and weighed back in`, `Topped off with half a pound`, `Not checked at all`], r: `Startup & commissioning` },
    { q: `What often ships loose inside a gas/electric packaged unit?`, a: [`The flue hood and vent parts`, `The compressor`, `The gas valve`, `The refrigerant`], r: `Gas piping (gas/electric units)` },
    { q: `What kind of duct is used outdoors?`, a: [`Insulated and weatherproofed, sealed with mastic`, `Bare flex duct`, `Uninsulated sheet metal with foil tape`, `Duct board`], r: `Set the unit on the curb or stand` },
    { q: `When is fall protection required?`, a: [`Working 6 feet or more above a lower level near an unprotected edge`, `Only above 20 feet`, `Only when it is windy`, `Only for the helper`], r: `Lift & roof safety` },
    { q: `At what elevation does a Goodman packaged gas unit need the high-altitude kit?`, a: [`Above 2,000 feet`, `Above 10,000 feet only`, `Never`, `Only on LP`], r: `Startup & commissioning` },
    { q: `What sizes the breaker?`, a: [`The nameplate maximum overcurrent protection`, `The old breaker`, `The disconnect rating`, `The wire that is already there`], r: `Electrical & controls` },
    { q: `What comes off before startup?`, a: [`All packaging and the duct covers`, `The filter-drier`, `The high-pressure switch`, `The drain pan`], r: `Startup & commissioning` },
    { q: `Which outdoor gas piping is acceptable?`, a: [`Rated for outdoor use, supported off the roof, protected from corrosion`, `Any black pipe laid on the roof`, `Flex connector the full length`, `Copper tubing`], r: `Gas piping (gas/electric units)` },
    { q: `What stops a lift?`, a: [`High wind, a bad rigging point, or people under the load`, `A cloudy sky`, `The customer watching`, `Nothing once the crane is on site`], r: `Lift & roof safety` }
  ] });
/* every HVAC module: we install Goodman */
M.filter(m => m.trade === `hvac`).forEach(m => { m.expect = [`We install Goodman. The numbers in this SOP come from Goodman's installation manuals. The manual that ships with the exact model on the job wins where it differs.`, ...(m.expect || [])]; });
})();
